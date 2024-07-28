import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import NewPostScreen from "../../screens/NewPostScreen";
import { USERS } from "../../data/User";
import { Button } from "react-native-elements";
import { Navigate } from "react-router-dom";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import { firebase } from "firebase/compat";

const handleSignout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Signed Out successfully ");
  } catch (error) {
    console.log(error);
  }
};

const HHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/Instagram-Wordmark-White-Logo.wine.png")}
        ></Image>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={require("../../assets/Untitled_design__1_-removebg-preview.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/icons8-heart-100-2.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            style={styles.icon}
            source={require("../../assets/icons8-sent-100.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
  },

  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },

  logo: {
    width: 100,
    height: 100,

    resizeMode: "contain",
  },

  icon: {
    resizeMode: "contain",
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 25,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  unreadBadgeText: {
    color: "white",
    fontWeight: 600,
  },
});

export default HHeader;
