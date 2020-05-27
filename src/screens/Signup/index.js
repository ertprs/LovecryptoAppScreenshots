import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, ImageBackground, StyleSheet, Image, StatusBar } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Layout, Text, Button, Input, Icon} from '@ui-kitten/components'

/**
|--------------------------------------------------
| Signup Screen with KeyboardAvoidingView ⌨️
|--------------------------------------------------
*/



export const SignupScreen = (props) => {
  
    return (
      // <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
      //   <View style={styles.form}>
      //     <AuthForm isSignup />
      //   </View>
      // </KeyboardAvoidingView>


      // <KeyboardAvoidingView behavior="padding"  >
    
       <ImageBackground source={require('../../assets/images/login_bg.png')} style={styles.backgroundImg}>
        <ScrollView>
          <Layout style={styles.container}>
            <Layout style={styles.title}>
              <Image  style={{height: 40, width: 260, resizeMode: 'contain'}} source={require('../../assets/images/logo_white.png')} ></Image>
            </Layout>
            <AuthForm isSignup/>
            <Button  appearance='ghost' status='control' onPress={() =>  props.navigation.navigate("LoginScreen")}>Já tem conta? Entre</Button>
          </Layout>
        </ScrollView>
      </ImageBackground>






    );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
 
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 26,
  },
  backgroundImg:{
    height: 1280,
    width: '100%',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  login: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 48,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'yellow',

  },
  section: {
     paddingVertical: 8,
     width: '100%',
     backgroundColor: 'green',
     flexDirection: 'column',
     flexWrap: 'wrap',
     alignItems: 'flex-end'
  },
  buttonCase:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  button: { 
    width: '100%'
  },
  
});
