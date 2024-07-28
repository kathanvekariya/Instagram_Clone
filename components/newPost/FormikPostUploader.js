import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import React, { isValidElement, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Divider } from "react-native-elements";
import { isUri } from "valid-url";
import { db, firebase } from "../../firebase";

const PLACEHOLDER_IMG = "https://i.ibb.co/ySbdgHF/icons8-add-image-96.png";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUsername = async () => {
    try {
      const user = await firebase.auth().currentUser;
      console.log(user);
      db.collection("user")
        .where("owen_uid", "==", user.uid)
        .limit(1)
        .onSnapshot((snapshot) => {
          
          snapshot.docs.map((doc) => {
            console.log(doc.data());
            setCurrentLoggedInUser({
              username: doc.data().user,
              profilePicture: doc.data().profile_picture,
            });
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    try {
      db.collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("posts")
        .add({
          imageUrl: imageUrl,
          user: CurrentLoggedInUser.username,
          profile_picture: CurrentLoggedInUser.profilePicture,
          owner_uid: firebase.auth().currentUser.uid,
          owner_email: firebase.auth().currentUser.email,
          likes_by_users: [],
          caption:""
        })
        .then(() => navigation.goBack());
    } catch (e) {
      console.log(e);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(PLACEHOLDER_IMG);
  };
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        inValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a Caption ..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter Image Url "
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 12, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Text style={{ color: "white" }}>{PLACEHOLDER_IMG}</Text>
          </TouchableOpacity>

          <Button
            onPress={handleSubmit}
            title="Share"
            disabled={!isValidElement}
          ></Button>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
