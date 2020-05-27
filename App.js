import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { AppNavigator } from './src/navigation/index'

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
import {YellowBox} from 'react-native';

import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { mapping, light, dark } from "@eva-design/eva";
const themes = { light, dark };
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as customTheme } from './src/shared/custom-theme.json'; // <-- Import app theme
import { ThemeContext } from './theme-context';
// By using react-native-screens, it is possible for each native platform to 
// optimize the memory usage for screens that are under the view stack and also simplify the native node hierarchy. 
enableScreens();

//Fix "Firebase App named '[DEFAULT]' already exists" issue
if (!firebase.apps.length) {
  // console.log("[App] Firebase.apps=", firebase.apps);
  // console.log("[App] Ready to initializeApp firebase.apps.length=", firebase.apps.length);
  firebase.initializeApp(firebaseConfig);
} else {
  // console.log("[App] Firebase.apps=", firebase.apps);
  // console.log("[App] Ready to firebase.app() firebase.apps.length=", firebase.apps.length);
  firebase.app();
}
// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'roboto-medium': require('./src/assets/fonts/Roboto-Medium.ttf')
//   });
// };

export default function App() {

  const [theme, setTheme] = React.useState('light');

  
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  
  // YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />);
  // }console.disableYellowBox = true;
  console.disableYellowBox = true;
  return (
    <>
    
    <IconRegistry icons = {EvaIconsPack}/>
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
    <ApplicationProvider  {...eva} theme={{ ...eva[theme], ...customTheme}}>
      <AppNavigator />
    </ApplicationProvider>
    </ThemeContext.Provider>
    </>
  );
}


// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: { screen: LoadingScreen },
//   LoginScreen: { screen: LoginScreen },
//   DashboardScreen: { screen: DashboardScreen }
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });