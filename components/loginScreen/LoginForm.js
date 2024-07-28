import { View, Text, TextInput ,Pressable} from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {firebase} from '../../firebase';
import { Alert } from 'react-native';


const LoginForm = ({navigation}) => {
  console.log('loginform')
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('An email is required'),
    password: Yup.string()
      .required()
      .min(8, 'Your password has to have at least 8 characters'),
  })

  const onLogin = async (email,password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
      console.log("🔥 Firebase Login Successful " ,email,password)
    }catch(error){
      Alert.alert(error.message)
    }

  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log('email =>',values);
          onLogin(values.email , values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    touched.email && errors.email ? 'red' : '#ccc',
                },
              ]}
            >
              <TextInput
                placeholder="Phone number, username, or email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={styles.inputField}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="password"
                autoFocus={false}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={{ alignItems: 'flex-end', marginBottom: 30, marginTop: 10 }}>
              <TouchableOpacity>
                <Text style={{ color: '#247ad1' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </Pressable>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                <Text style={{ color: '#247ad1' }}> Sign Up</Text>
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

export default LoginForm;
