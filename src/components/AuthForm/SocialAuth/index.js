import React from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';
import { Button, Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import * as Facebook from 'expo-facebook';
import { saveData } from '../../../memoryAccess/saveData'
import { GoogleSocialButton , FacebookSocialButton } from "react-native-social-buttons";
import api from '../../../api'
import { APP_ID } from "../../../config";
import {
    androidClientId,
    androidStandaloneAppClientId,
    iosClientId
  } from "../../../config";

  // const getToken = async () => {
  //   token = await firebase.auth().currentUser.getIdToken().then(res => {
  //     return res
  //   })
  //   return await token
  // }
  
  const loginApi = async () => {
    token =  await firebase.auth().currentUser.getIdToken()
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try{
        await api.get('/auth', config).then( response => { 
          let userData = response.data.user_data;
          saveData('@userData', userData)
      });
    }catch ( error ) {
      console.log(error.message)
    }
  }
  
  const registerApi = async (email, name, uid) => {
    token = await firebase.auth().currentUser.getIdToken()
    body = {
        email: email,
        name: name,
        firebase_uid: uid
    }
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    data = {
      email: email,
      name: name,
      firebase_uid: uid
    }
    try{
        await api.post('/register', data, config)
    }catch ( error ) {
      console.log(error.message)
    }
  }

export const SocialAuth = props => {
  isUserEqual = (user, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === user.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = user => {
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        if (!this.isUserEqual(user, firebaseUser)) {
          var credential = (user.token) ?
            firebase.auth.FacebookAuthProvider.credential(user.token) :
            firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken
            );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    email: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    name: result.additionalUserInfo.profile.name,
                    created_at: Date.now()
                  })
                  .then(function (snapshot) {
                    console.log('[LoginScreen][onSignin][FirebaseAuth] Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
            });
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: iosClientId,
        androidClientId: androidClientId,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  // async function logIn() {
  signInWithFacebookAsync = async () => {
    try {
      await Facebook.initializeAsync(APP_ID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (result.type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
        console.log('[LoginScreen][signInWithGoogleAsync] Logged in!', `Hi ${(await response.json())}!`);
        //this.onSignIn(result);
        var credential = firebase.auth.FacebookAuthProvider.credential(result.token)
        firebase
        .auth()
        .signInWithCredential(credential).then(res => {
          console.log('1 ' + res.user.email + ' ' + res.user.displayName + ' ' + res.user.uid)
          try{
            registerApi(res.user.email, res.user.displayName, res.user.uid).then(response => {
              loginApi()
            })
          }catch ( error ) {
            loginApi()
            console.log(error.message)
    
          } 
            return res
          })
        return result.token;
      } else {
        return { cancelled: true };
      }
    } catch ({ message }) {
      console.log('[LoginScreen][signInWithGoogleAsync] err message=', message);
      return { error: true };
    }
  };

  return (
    <Layout style={styles.container}>
      <Layout style = {{backgroundColor: 'transparent'}}>
        <Text status = 'control' category = 'p1'>ou entre com</Text>
      </Layout>
      <Layout style = {{ marginTop: 10, backgroundColor: 'transparent'}}>
        <Layout  style={{marginTop: 20, backgroundColor: 'transparent'}} >
          <FacebookSocialButton  onPress={() => signInWithFacebookAsync()}/>
        </Layout>
        {/* <Layout style={{marginTop: 20, backgroundColor: 'transparent'}}>
          <GoogleSocialButton onPress={() => signInWithGoogleAsync()}/>
        </Layout> */}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 40,
  },
  googleProfileContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  image: { width: 128, borderRadius: 64, aspectRatio: 1 },
  text: { color: 'black', fontSize: 16, fontWeight: '600' },
  button: { marginHorizontal: 16}
});
