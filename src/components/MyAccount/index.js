import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Layout,
    Drawer,
  } from 'react-native-ui-kitten';
import { SafeAreaView, withNavigation} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

const drawerData = [
  { title: 'Suporte', route: 'Suport'},
  { title: 'Legal', route: 'Legal'},  
  { title: 'Sobre',  route: 'About'}
];

//Lista as opções de configurações e ajuda para o usuário
class MyAccountConfig extends React.Component {

  onSelect = (index) => {
    this.props.navigation.navigate(drawerData[index].route)
  };
  
  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Drawer style = {{ justifyContent: 'center'}}
            data={drawerData}
            onSelect={this.onSelect}
          />
      </SafeAreaView>
    </Layout>
    );
  }
}

export const MyAccount = withNavigation(MyAccountConfig)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%'
  },
});