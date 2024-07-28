import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { StyleSheet } from "react-native";

export const bottomTabIcons = [
  {
    name: "Home",
    inactive: "https://i.ibb.co/JBdNxxY/icons8-home-144.png",
    active: "https://i.ibb.co/KGz3q4y/icons8-home-96.png",
  },

  {
    name: "Search",
    inactive: "https://i.ibb.co/JqSZ1JG/icons8-search-100.png",
    active: "https://i.ibb.co/w0b8F5z/icons8-search-100-2.png",
  },

  {
    name: "Reels",
    inactive: "https://i.ibb.co/CvtzDXK/icons8-instagram-reels-100.png",
    active: "https://i.ibb.co/kMPCrG6/icons8-instagram-reels-100-2.png",
  },

  {
    name: "Shop",
    active: "https://i.ibb.co/T2X38Pb/icons8-instagram-shop-96.png",
    inactive: "https://i.ibb.co/5Ypypbn/icons8-instagram-shop-96-2.png",
  },

  {
    name: "Profile",
    inactive: "https://i.ibb.co/J3KpVrz/IMG-4195.jpg",
    active: "https://i.ibb.co/J3KpVrz/IMG-4195.jpg",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name == "Profile" ? styles.profilePic() : null,
          activeTab == "Profile" && icon.name == activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#000",
  },

  container: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab == "Profile" ? 2 : 0,
    borderColor: "#fff",
  }),
});

export default BottomTabs;
