import React from "react";
import {  Dimensions } from "react-native";
import { Google } from "expo";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
  androidClientId,
  androidStandaloneAppClientId,
  iosClientId
} from "../../../config";
import { loginAction } from "../../../store/actions/auth.action";
import { Button } from 'react-native-ui-kitten';

import { Ionicons } from "@expo/vector-icons";

GoogleIcon = () => (
  <Ionicons name= {'logo-google'} size={20} color="#fff" />
);

const signInWithGoogleAsync = async props => {
  // console.log("func google login");
  try {
    const result = await Google.logInAsync({
      androidClientId,
      // androidStandaloneAppClientId,
      iosClientId,
      scopes: ["profile", "email"]
    });
    console.log('result>>>', result)
    if (result.type === "success") {
      console.log("Result>>>>>", result);
      props.login();
      return props.navigation.navigate("HomeScreen");
    } else {
      console.log("Result>>>>>", result);
      return { cancelled: true };
    }
  } catch (e) {
    console.log("error", e);
    return { error: true };
  }
};

export const GoogleAuthWithNav = withNavigation(props => {
  return (
    //<Button title="Google Login" onPress={() => signInWithGoogleAsync(props)} />
    //<Button status='primary'>Google</Button>
    <Button onPress={() => signInWithGoogleAsync(props)} size = {Dimensions.get("window").width <=300 ? 'small' : 'medium'} status='info' icon={GoogleIcon}>Google</Button>
  );
});

// const mapStateToProps = state => ({
//   userStatus: state.authReducer.userStatus
// });

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(loginAction({ userStatus: true }))
  };
};

export const GoogleAuth = connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(GoogleAuthWithNav);