import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SignUpForm from '../components/signupScreen/SignUpForm'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const INSTAGRAM_LOGO = 'https://i.ibb.co/3hCF7fJ/new-Instagram-logo-png-full-colour-glyph.png';

const SignUpScreen = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        source={{ uri: INSTAGRAM_LOGO }}
        style={{ height: 100, width: 100 }}
      />
    </View>
    <SignUpForm navigation = {navigation}></SignUpForm>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});

export default SignUpScreen;
