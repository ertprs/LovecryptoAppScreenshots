import { createAppContainer , createDrawerNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import { ProfileNavigator } from './profileNavigator';
import { homeNavigator } from './homeNavigator';
import { RankingScreen } from './../screens/Ranking'
import { HistoryScreen } from './../screens/History'
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
      <BottomNavigationTab title='Histórico'/>
      <BottomNavigationTab title='Ranking'/>
      <BottomNavigationTab title='Conta'/>
    </BottomNavigation>
  );
};

export const AppDrawerNavigator = createBottomTabNavigator({
  // Wallet: { screen: HistoryScreen },
  Tasks: { screen: homeNavigator },
  History: { screen: HistoryScreen },
  Ranking: { screen: RankingScreen },
  Account: { screen: ProfileNavigator }
  //Account: { screen: ContactStack }
},{
    initialRouteName: 'Tasks',
    // order: ['Wallet', 'Tasks', 'Account'],
    order: ['Tasks', 'History', 'Ranking', 'Account'],
    tabBarComponent: TabBarComponent,
    defaultNavigationOptions:{
      header: null
    }
}
  
);
