import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import HHeader from '../components/Home/HHeader';
import Stories from '../components/Home/Stories';
import Post from '../components/Home/Post';
import BottomTabs, { bottomTabIcons } from '../components/Home/BottomTabs';
import { db } from '../firebase';

const HomeScreen = ({ navigation }) => {
  console.log("HomeScreen");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   db.
   collectionGroup('posts').
   onSnapshot((snapshot) => {

     setPosts(snapshot.docs.map(post => ({
      id : post.id , ...post.data()
     })));
    });

    
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <HHeader navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default HomeScreen;
