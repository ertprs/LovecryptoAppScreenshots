import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from "react";

import{
    HomeScreen
} from '../screens/Home'

import{
    TaskAnsweringScreen
} from '../screens/TaskAnswering'

export const Navigator = createStackNavigator({
    Home : {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Task : {
        screen: TaskAnsweringScreen,
        navigationOptions: {
            header: null,
        }  
    }, 
});

export const homeNavigator = createAppContainer(Navigator);
