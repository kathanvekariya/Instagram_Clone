import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack } from './navigation';
import { useGestureHandlerRef } from '@react-navigation/stack';
import firebase from 'firebase/compat';
import { useIsFocused } from '@react-navigation/native';
const AuthNavigation = (navigation) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user));
    // checkFirebaseUser();

    // return () => unsubscribe();
  }, []);

  // const checkFirebaseUser = async () =>({
  //     await :firebase.auth().onAuthStateChanged(user => {
  //       console.log(user);
  //       setCurrentUser(user);
  //       if(currentUser){
  //           navigation.navigation("LoginScreen");
  //       }else{
  //           navigation.navigation("HomeScreen");
  //       }
  //     })
  // });

  return (
    <>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </>
  );
};

export default AuthNavigation;
