import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

const DashboardIcon = (style) => (
  <Icon {...style} name='layout'/>
);

const SettingsIcon = (style) => (
  <Icon {...style} name='settings'/>
);

export class Menu extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        <BottomNavigationTab
          title='Carteira'
          //icon={DashboardIcon}
        />
        <BottomNavigationTab
          title='Pesquisas'
          //icon={SettingsIcon}
        />
        <BottomNavigationTab
          title='Conta'
          //icon={SettingsIcon}
        />
      </BottomNavigation>
    );
  }
}