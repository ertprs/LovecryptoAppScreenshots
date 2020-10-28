import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { AppRegistry, SafeAreaView , Platform} from "react-native";
import {ThemeContext} from './theme-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light, dark} from '@eva-design/eva';
import { default as customTheme } from './custom-theme.json';
import { default as customMapping } from './custom-mapping.json'; 
import { AppNavigator  } from "./src/navigation/navigation.component";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import auth from '@react-native-firebase/auth';
import AnimatedSplash from "react-native-animated-splash-screen";
 
import { setFirstAccess } from './src/store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
const themes = {light, dark};
console.disableYellowBox = true;
import messaging from '@react-native-firebase/messaging';
import { WelcomeScreen } from './src/screens/welcomescreen';
//import { Constants } from 'react-native-unimodules';
//console.log(Constants.systemFonts);

const  StarterApp = () => {
 
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState('light');
  const currentTheme = themes[theme];
 
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
  
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }
{/*


  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    if(Platform.OS == 'ios'){
      requestUserPermission()
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // Aqui podemos colocar ações, como ir para uma pagina
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        
      });
  }, []);
  */}
  useEffect(() => {
    setTimeout(() => { setIsLoaded(true)}, 500);
   }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
   
  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      logoImage={require("./src/assets/images/icon.png")}
      backgroundColor={"#fff"}
      logoHeight={150}
      logoWidth={150}
    >
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ApplicationProvider
                {...eva}
                mapping={mapping}
                theme={{ ...eva[theme], ...customTheme}}>
                
                   <AppNavigator/> 
                   
                 
              </ApplicationProvider>
            </PersistGate>
          </Provider>
          </ThemeContext.Provider>
      </React.Fragment>
    </AnimatedSplash>
    );
  }
 

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;