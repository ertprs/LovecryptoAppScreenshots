import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import React from "react";
import { TopNavigationAccessoriesShowcase } from '../shared/NavHeader'
import{
    HomeScreen
} from '../screens/Home'

import{
    TaskAnsweringScreen
} from '../screens/TaskAnswering'

import {
    TaskFinishedScreen
} from '../screens/TaskFinished'

import{
    ReferalScreen
} from '../screens/Referal'

export const Navigator = createStackNavigator({
    Home : {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            header: null//<TopNavigationAccessoriesShowcase navigation = {navigation}  title = 'Home'/>,
        })    
    },
    Task : {
        screen: TaskAnsweringScreen,
        navigationOptions: {
            header: null,
        }  
    }, 
    CompletedTask : {
        screen: TaskFinishedScreen,
        navigationOptions: {
            header: null,
        }  
    }, 
});

export const homeNavigator = createAppContainer(Navigator);
