import { View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {firebase,db} from '../../firebase';
import { Alert } from 'react-native';


const SignUpForm = ({navigation}) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('An email is required'),
    username : Yup.string().required().min(2, 'A username is required '), 
    password: Yup.string()
      .required()
      .min(8, 'Your password has to have at least 8 characters'),
  })

  const getRandomProfilePicture = async () => {
    const response =await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

   const onSignup = async (email,password,username) => {
    try{
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email,password)
      console.log("🔥 Firebase User Created Successful " ,email,password)
      db.collection('user').doc(authUser.user.email).set({
        owner_uid : authUser.user.uid,
         username : username,
         email : authUser.user.email,
         profile_picture : await getRandomProfilePicture(),
        })
    }catch(error){
      Alert.alert('My Lord ...' , error.message)
    }

  }



  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: touched.email && errors.email ? "red" : "#ccc",
                },
              ]}
            >
              <TextInput
                placeholder="Phone number, username, or email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              ></TextInput>
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="password"
                autoFocus={false}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit}>
              <Pressable
                marginTop={50}
                titleSize={20}
                style={styles.button(isValid)}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#247ad1" }}> Log In </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#FFF',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});


export default SignUpForm