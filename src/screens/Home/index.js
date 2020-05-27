import React, { Component } from "react";
import { StatusBar, SafeAreaView, Image, StyleSheet} from "react-native";

import { HeadWallet } from '../../components/HeadWallet';
import { SurveyList } from '../../components/SurveyList'
import { Layout, Button, Text } from '@ui-kitten/components'
import { ScrollView } from "react-native-gesture-handler";
import { Header } from '../../components/Header';


//Tela principal quando logada, onde mostramos as tasks
export const HomeScreen = (props) => {
  
    return (
      <ScrollView>
        <HeadWallet/>
        <Header title = 'Tarefas'/>
        <SurveyList navigation = {props.navigation}/>
      </ScrollView>
    );
  }




