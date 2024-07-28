import { View, Text, StyleSheet , Image, TouchableOpacity , } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
import HomeScreen from '../../screens/HomeScreen'

const AddNewPost = ({navigation}) => (
    <View style = {styles.container}>
        <Header navigation = {navigation}></Header>
        <FormikPostUploader navigation = {navigation}></FormikPostUploader>
    </View>
)

const Header = ({navigation}) =>  (
      <View style = {styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source = {{uri : 'https://i.ibb.co/3FtN6Nj/icons8-back-100.png'}}
            style = {{width : 30 , height : 30}}
        />
      </TouchableOpacity>
      <Text style = {styles.headerText}>NEW POST </Text>
      <Text></Text>
    </View>
)

const styles = StyleSheet.create ({
    container : {
        marginHorizontal : 10,
    },

    headerContainer :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },

    headerText :{
        color : '#fff',
        fontSize : 20,
        fontWeight : '700',
        marginRight : 23,
    }

})

export default AddNewPost