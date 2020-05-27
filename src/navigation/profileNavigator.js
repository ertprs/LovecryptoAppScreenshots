import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { TopNavigationAccessoriesShowcase } from '../shared/NavHeader'
import {
    ContactScreen
} from '../screens/Contact'
import {
    PaymentAccountsScreen
} from '../screens/PaymentAccounts'
import {
    LocationScreen
} from '../screens/Location'
import {
    SuportScreen
} from '../screens/Suport'

import {
    ChatScreen
} from '../screens/Chat'


import {
    NotificationScreen
} from '../screens/Notification'

import {
    ChangePasswordScreen
} from '../screens/ChangePassword'


import {
    ShareAppScreen
} from '../screens/ShareApp'

import {
    AssociedAccountsScreen
} from '../screens/AssociedAccounts'


import {
    DetailScreen
} from '../screens/Detail'
import {
    DetailChangeScreen
} from '../screens/DetailChange'
 
  
import { LegalNavigator } from '../navigation/legalNavigator'

const DetailNavigator = createStackNavigator({
    Detail : {
        screen: DetailScreen,
        navigationOptions: ({navigation}) => ({
            header: null //<TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Detalhes'/>,
        })       
    },
    DetailChange:{
        screen: DetailChangeScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Editar Detalhes'/>,
        })     
    },
});

export const Navigator = createStackNavigator({
    Account : {
        screen: ContactScreen,
        navigationOptions: ({navigation}) => ({
            header: null // <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Profile'/>,
        })       
    },
    Detail : {
        screen: DetailNavigator,
        navigationOptions: {
            header: null,
            // headerTitleStyle: {
            //     color: 'white'
            // }
            
        }    
    },
    // DetailChange:{
    //     screen: DetailChangeScreen,
    //     navigationOptions: {
    //         title: 'Editar Dado',
    //     }      
    // },
    Payment:{
        screen: PaymentAccountsScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Location:{
        screen: LocationScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Notifications:{
        screen: NotificationScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Configurações'/>,
        })   
    },
    ChangePassword:{
        screen: ChangePasswordScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Configurações' subtitle = 'Alterar Senha'/>,
        })   
    },
    Suport:{
        screen: SuportScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Suporte'/>,
        })    
    },
    Chat:{
        screen: ChatScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Suporte' subtitle = 'Falar com suporte'/>,
        })    
    },
    AssociedAccounts:{
        screen: AssociedAccountsScreen,
        navigationOptions: {
            header: null,
        }    
    },
    ShareApp:{
        screen: ShareAppScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Legal:{
        screen: LegalNavigator,
        navigationOptions: {
            header: null,
        }    
    }, 
   
});

export const ProfileNavigator = createAppContainer(Navigator);
