import React from "react";
import { Provider } from "react-redux";
import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View
} from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import { AppNavigator } from "./src/navigation";
import { Loading } from "./src/components/Loading";
import { firebaseConfig } from "./src/config";
import * as firebase from "firebase";
import { ApplicationProvider, Layout, IconRegistry } from 'react-native-ui-kitten';
import Colors from "./src/constants/Colors";
import { mapping, light, dark } from "@eva-design/eva";
import { ThemeContext } from "./src/contexts/theme-context";
const themes = { light, dark };
//import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as customTheme } from './src/shared/custom-theme.json'; // <-- Import app theme
/**
 |--------------------------------------------------
 | Main App with Redux provider, redux-persist PeristGate, persisitor and Firebase 🔥 Initialization
 |--------------------------------------------------
*/

export default function App(props) {
  
  const [theme, setTheme] = React.useState("light");
  const currentTheme = themes[theme];

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };
  
  return (
    <ApplicationProvider mapping={mapping} theme={{ ...eva.light, ...customTheme}}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </ApplicationProvider>
  );
}
