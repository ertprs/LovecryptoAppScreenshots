import React, { Component } from "react";
import { View, StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Divider, Icon, TopNavigation, TopNavigationAction, Button} from '@ui-kitten/components'
import { Ionicons } from "@expo/vector-icons";
import { generalStyle } from '../../shared/generalStyle';
import { FAQ } from '../../components/FAQ'

export const SuportScreen = (props) => {

  BackIcon = (style) => (
    <Ionicons name= {'md-arrow-back'} size={20} color="#000" />
  );
  
  navigateBack = () => {
    this.props.navigation.goBack(null);
  };
  
  BackAction = () => (
    <TopNavigationAction icon={this.BackIcon} onPress={this.navigateBack}/>
  );

  
  return (
    <ScrollView>
      <FAQ/>
      <Layout style = {styles.buttonCase}>
        <Button appearance='outline' status = 'info' onPress={() => props.navigation.navigate('Chat')}>Falar com suporte</Button>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonCase:{
    // position: 'absolute',
    // bottom: 60,
    width: '100%',
    padding: 4,
    padding: 50,
    paddingHorizontal: 48,
  },
});
