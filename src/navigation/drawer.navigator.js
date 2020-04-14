import { createBottomTabNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";

import { BottomNavigation, BottomNavigationTab} from 'react-native-ui-kitten';
import { ProfileNavigator } from './profileNavigator';
import { homeNavigator } from './homeNavigator';

import React from 'react';

//Mudar esse componente para um arquivo próprio
const TabBarComponent = ({ navigation }) => {

  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };
 
  return (
    <BottomNavigation   selectedIndex={navigation.state.index} onSelect={onSelect}>
      {/* <BottomNavigationTab title='Wallet'/> */}
      <BottomNavigationTab title='Tarefas'/>
      <BottomNavigationTab title='Conta'/>
    </BottomNavigation>
  );
};

export const AppDrawerNavigator = createBottomTabNavigator({
  // Wallet: { screen: HistoryScreen },
  Tasks: { screen: homeNavigator },
  Account: { screen: ProfileNavigator }
  //Account: { screen: ContactStack }
},{
    initialRouteName: 'Tasks',
    // order: ['Wallet', 'Tasks', 'Account'],
    order: ['Tasks', 'Account'],
    tabBarComponent: TabBarComponent,
    defaultNavigationOptions:{
      header: null
    }
}
  
);
