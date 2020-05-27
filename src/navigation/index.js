import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'
import {
  WelcomeScreen
} from '../screens/Welcome'

import {
  LoginScreen
} from '../screens/Login'

import {
  SignupScreen
} from '../screens/Signup'

import {
  ForgotPasswordScreen
} from '../screens/ForgotPassword'


import {
  AuthLoadingScreen
} from '../screens/AuthLoading'

import { AppDrawerNavigator } from "./drawer.navigator";


// Stack de login do app
const AuthStack = createStackNavigator(
  { 
    Landing: WelcomeScreen,
    LoginScreen: LoginScreen, 
    SignupScreen: SignupScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  { 
    headerMode: 'none',
  }
);

// Stack inicial do app, redireciona para a stack de login
const AppNavigatorContainer = createSwitchNavigator(
  {
    App: AppDrawerNavigator,
    Auth: AuthStack,
    Loading: AuthLoadingScreen
  }, 
  {
    initialRouteName: "Loading"
  }
);

export const AppNavigator = createAppContainer(AppNavigatorContainer);
