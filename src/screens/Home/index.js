import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet} from "react-native";

import { HeadWallet } from '../../components/HeadWallet';
import { SurveyList } from '../../components/SurveyList'
import { Layout } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from '../../components/Header';


//Tela principal quando logada, onde mostramos as tasks
export class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <HeadWallet/>
        <Header title = 'Tarefas'/>
        <SurveyList navigation = {this.props.navigation}/>
      </ScrollView>
    );
  }
}
