import {  createAppContainer } from 'react-navigation';
import { TopNavigationAccessoriesShowcase } from '../shared/NavHeader'
import { createStackNavigator } from 'react-navigation-stack'

import React from 'react'
import{
    LegalScreen,
} from '../screens/Legal'

import{
    ThermsScreen
} from '../screens/Therms'

import{
    PrivacyScreen
} from '../screens/Privacy'

import{
    MyDataScreen
} from '../screens/MyData'

export const Navigator = createStackNavigator({
    Legal:{
        screen: LegalScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Legal'/>,
        })    
    },
    Therms:{
        screen: ThermsScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Termos e Condições'/>,
        })    
    },
    Privacy:{
        screen: PrivacyScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Politica de privacidade'/>,
        })    
    },
    MyData:{
        screen: MyDataScreen,
        navigationOptions: ({navigation}) => ({
            header: <TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Meus dados'/>,
        })    
    }  
});

export const LegalNavigator = createAppContainer(Navigator);
