import React, {useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import { ThemeContext } from '../../theme-context';
import { ChangePasswordScreen } from '../screens/changepassword';
import { useSelector, useDispatch } from 'react-redux';

import { EditProfileScreen } from '../screens/editprofile';
import { ForgotPasswordScreen } from '../screens/forgotpassword'
import { FaqScreen } from '../screens/faqscreen';
import { Homescreen } from '../screens/homescreen';
import { LegalScreen } from '../screens/legal';
import { LinkedAccountsScreen } from '../screens/linkedaccounts';
import { LoadingScreen } from '../screens/loadingscreen'
import { LoginScreen } from '../screens/loginscreen';
import { MyDataScreen } from '../screens/mydata'
import { PrivacyPolicyScreen } from '../screens/privacypolicy';
import { ProfileScreen } from '../screens/profilescreen';
import { HelpScreen } from '../screens/helpscreen'
import { RankingScreen } from '../screens/ranking'
import { ReferalScreen } from '../screens/referalscreen';
import { SettingsScreen } from '../screens/settingsscreen';
import { ShareApp } from '../screens/shareapp';
import { SignupScreen } from '../screens/signupscreen';
import { TaskAnsweringScreen } from '../screens/taskanswering'
import { TaskFinishedScreen } from '../screens/taskfinished';
import { TermsScreen } from '../screens/terms';
import { WelcomeScreen } from '../screens/welcomescreen';
import { RequestWithDrawScreen } from '../screens/requestwithdraw';
import { ConfirmWithdrawScreen } from '../screens/confirmwithdraw';
import { AddAccountScreen } from '../screens/addAccount';

// Pega o estado atual de navegação
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // Entra nos navigators aninhados
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
 
// Navegador Principal
export const AppNavigator = () => {
  const authState = useSelector(state => state.authState);
  const [ isLoading, setIsLoading] = useState(true)
  const [ user, setUser ] = useState(null)
  // console.log('USUARIO ' + JSON.stringify(auth().currentUser.additionalUserInfo.isNewUser))  
  useEffect (() => {
    setIsLoading(false)
    auth().onAuthStateChanged(user => {
      setUser(user)
    });
  }, [])

  return(
    <NavigationContainer 
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentRouteName = getActiveRouteName(currentState);
        const previousRouteName = getActiveRouteName(prevState);
        if (previousRouteName !== currentRouteName) {
          //envia para o analytics a tela atual
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}>  
        { authState.isLoggin ? <LoadingScreen/> : authState.logged ? <TabNavigator/> : <AuthNavigator/>}  
    </NavigationContainer>
  )
}
 
// Navagador de tabs na parte principal 
const BottomTab = createBottomTabNavigator();
const TabNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} /> }>
    <BottomTab.Screen name="Home" component={HomeNavigator}/>
    {/* <BottomTab.Screen name="Home" component={WithdrawNavigator}/> */}
    {/* <BottomTab.Screen name="Ranking" component={RankingScreen} />
    <BottomTab.Screen name="Historico" component={RankingScreen} />    */}
    <BottomTab.Screen name="Profile" component={ProfileNavigator} />
  </BottomTab.Navigator>
);

// Botões do navegador inferior
const BottomTabBar = ({navigation, state}) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  return (
    <SafeAreaView
      style={{
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab
          title="Tarefas"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        {/* <BottomNavigationTab
          title="Ranking"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        <BottomNavigationTab
          title="Histórico"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        /> */}
        <BottomNavigationTab
          title="Perfil"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

//Navigator de autenticação
const AuthStack = createStackNavigator()
const AuthNavigator = () => (
  <AuthStack.Navigator headerMode = 'none'>
    <AuthStack.Screen name = 'Welcome' component = {WelcomeScreen} />
    <AuthStack.Screen name = 'Referal' component = {ReferalScreen} />
    <AuthStack.Screen name = 'Signup' component = {SignupScreen} />
    <AuthStack.Screen name = 'Login' component = {LoginScreen} />
    <AuthStack.Screen name = 'Forgot' component = {ForgotPasswordScreen} />
    <AuthStack.Screen name = 'Terms' component = {TermsScreen} />
  </AuthStack.Navigator>
)

// Home Stack
const Stack = createStackNavigator() ;
const HomeNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={ Homescreen } />
    <Stack.Screen name="Task" component={SurveyNavigator} />
    <Stack.Screen name="Withdraw" component={WithdrawNavigator} />
  </Stack.Navigator>
);



// Survey Stack
const Survey = createStackNavigator() ;
const SurveyNavigator = () => (
  <Survey.Navigator headerMode="none">
    <Survey.Screen name="Task" component={TaskAnsweringScreen} />
    <Survey.Screen name="TaskFinished" component={TaskFinishedScreen } />
  </Survey.Navigator>
);
 
// Navegador da retirada
const Withdraw = createStackNavigator() ;
const WithdrawNavigator = () => (
  <Withdraw.Navigator headerMode="none">
    <Withdraw.Screen name="Linkedaccounts" component={ LinkedAccountsScreen } />
    <Withdraw.Screen name="Requestwithdraw" component={ RequestWithDrawScreen } />
    <Withdraw.Screen name="Addaccount" component={ AddAccountScreen } />
    <Withdraw.Screen name="Confirmwithdraw" component={ ConfirmWithdrawScreen } />
  </Withdraw.Navigator>
);
  
//Navegador da parte de Configurações
const SettingsStack = createStackNavigator() ;
const SettingsNavigator = () => (
  <SettingsStack.Navigator headerMode="none">
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen}  />
  </SettingsStack.Navigator>
);
 
//Navegador do Perfil
const ProfileStack = createStackNavigator() ;
const ProfileNavigator = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Detail" component={EditProfileScreen}  />
    <ProfileStack.Screen name="Settings" component={SettingsNavigator} />
    <ProfileStack.Screen name="AssociedAccounts" component={LinkedAccountsScreen} />
    <ProfileStack.Screen name="ShareApp" component={ShareApp} />
    <ProfileStack.Screen name="Legal" component={LegalNavigator} />
    <ProfileStack.Screen name="Suport" component={SupportNavigator} />
  </ProfileStack.Navigator>
);

const SupportStack = createStackNavigator() ;
const SupportNavigator = () => (
  <SupportStack.Navigator headerMode="none">
    <SupportStack.Screen name="FAQ" component={FaqScreen} />
    <SupportStack.Screen name="Help" component={HelpScreen} />
  </SupportStack.Navigator>
);

//Navegador da parte de informações legais
const LegalStack = createStackNavigator() ;
const LegalNavigator = () => (
  <LegalStack.Navigator headerMode="none">
    <LegalStack.Screen name="Legal" component={LegalScreen} />
    <LegalStack.Screen name="Terms" component={TermsScreen} />
    <LegalStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen}  />
    <LegalStack.Screen name="MyData" component={MyDataScreen}  />
  </LegalStack.Navigator>
);