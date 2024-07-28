import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { USERS } from "../../data/User";
import { POSTS } from "../../data/posts";
import firebase from "firebase/compat";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://i.ibb.co/M6wm2nG/icons8-heart-100-2.png",
    likedImageUrl: "https://i.ibb.co/V30x4v4/icons8-heart-96.png",
  },

  {
    name: "Comment",
    imageUrl: "https://i.ibb.co/vHbRNnT/icons8-comment-100.png",
  },

  {
    name: "Share",
    imageUrl: "https://i.ibb.co/f8qJY4d/icons8-sent-100.png",
  },

  {
    name: "Save",
    imageUrl: "https://i.ibb.co/72TtmhZ/icons8-bookmark-100.png",
  },
];
const post = ({ post }) => {
  console.log("post =>", { post });
  const handleLike = (post) => {
    try {
      const currentUser = firebase.auth().currentUser.email;
      console.log("current user", currentUser);
      // post.likes_by_users = Array.from(post.likes_by_users)
      console.log(typeof post.likes_by_users);
      const currentLikeStatus = !post.likes_by_users.includes(currentUser);
      db.collection("users")
        .doc(post.owner_email)
        .collection("post")
        .doc(post.id)
        .update({
          likes_by_users: currentLikeStatus
            ? firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.email
              )
            : firebase.firestore.FieldValue.arrayRemove(
                firebase.auth().currentUser.email
              ),
        })
        .then(() => {
          console.log("document successfully updated");
        })
        .catch((error) => {
          console.log("error updating document :", error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post}></PostHeader>
      <PostImage post={post}></PostImage>
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike}></PostFooter>
        <Likes post={post}></Likes>
        <Caption post={post}></Caption>
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.imageUrl }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>

    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{ uri: postFooterIcons[0].imageUrl }}
        ></Image>
      </TouchableOpacity>
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[1].imageUrl}
      ></Icon>
      <Icon
        imgStyle={styles.footerIcon}
        imgUrl={postFooterIcons[2].imageUrl}
      ></Icon>
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl}>
        {" "}
      </Icon>
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length} likes
    </Text>
  </View>
);
// {
//   post.like_by_users.length.toLocaleString("en");
// }
const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [{ rotate: "320deg" }],
    marginTop: -3,
  },

  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },

  postlike: {
    width: 100,
    height: 100,

    resizeMode: "contain",
  },
});

export default post;
