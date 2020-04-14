import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { UserHeader } from '../../components/UserHeader';
import { MyAccount} from '../../components/MyAccount';
import {
  Layout,
  Button
} from 'react-native-ui-kitten';
import * as firebase from "firebase";

const styles = StyleSheet.create({
  
  buttonCase:{
    position: 'absolute',
    bottom: 64,
    width: '100%',
    padding: 4,
    paddingHorizontal: 72,
  },
});

export class ContactScreen extends Component {
  signout = async () => {
    await firebase.auth().signOut();
    return this.props.navigation.navigate("Welcomecreen");
  };

  render() {
    return (
        
          <Layout style = {{flex: 1, alignItems: 'center', width: '100%'}}>
            <UserHeader></UserHeader>
            <MyAccount></MyAccount>
            <Layout style = {styles.buttonCase}>
              <Button appearance='outline' status = 'info' onPress={() => this.signout()}>Deslogar</Button>
            </Layout>
          </Layout>
    );
  }
}

