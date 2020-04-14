import React, { Component } from "react";
import { View, StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Layout } from 'react-native-ui-kitten';
import { generalStyle } from '../../shared/generalStyle';

export class AboutScreen extends Component {
  render() {
    return (
      <Layout style = { generalStyle.container }>
        <Image style = {{height: 50, width: 260}} source={require('../../../assets/images/logo.png')} ></Image>
        <Layout  style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}} >
          <Text category='s2'>Lovecrypto Inc</Text>
          <Text category='c1' appearance='hint'>Lovecrypto para Android - versão 1.0.0</Text>
        </Layout>
      </Layout>
    );
  }
}
