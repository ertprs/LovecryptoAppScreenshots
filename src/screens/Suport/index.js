import React, { Component } from "react";
import { View, StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Divider, Icon, TopNavigation, TopNavigationAction} from 'react-native-ui-kitten'
import { Ionicons } from "@expo/vector-icons";
import { generalStyle } from '../../shared/generalStyle';


export class SuportScreen extends Component {

  BackIcon = (style) => (
    <Ionicons name= {'md-arrow-back'} size={20} color="#000" />
  );
  
  navigateBack = () => {
    this.props.navigation.goBack(null);
  };
  
  BackAction = () => (
    <TopNavigationAction icon={this.BackIcon} onPress={this.navigateBack}/>
  );

  render() {
    return (
      <ScrollView>
        <Layout style = {generalStyle.container}>
          <Image style = {generalStyle.topImageIcon} source={require('../../../assets/images/support_icon.png')} ></Image>
            <Text style = {generalStyle.title} category='h6' >Teve algum problema?</Text> 
            <Text style = {generalStyle.paragraph}>Envie email para hi@lovecrypto.net explicando detalhadamente o erro apresentado no app e se possivel, um screenshot do erro</Text>
            <Text style = {generalStyle.paragraph} category = 's1' appearance = 'hint' >Nosso app está em beta, nos perdoem pelos bugs :)</Text>   
        </Layout>
      </ScrollView>
    );
  }
}
