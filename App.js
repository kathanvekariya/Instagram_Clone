import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React from 'react';
import NewPostScreen from './screens/NewPostScreen';
import SignedInStack from './navigation';
import AuthNavigation from './AuthNavigation';

export default function App() {
  return (
     <View style ={{flex: 1 , backgroundColor : 'red'}}>
       <AuthNavigation></AuthNavigation>
     </View>
    
  )
}


