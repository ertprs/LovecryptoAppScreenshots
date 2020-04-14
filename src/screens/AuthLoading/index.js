import * as firebase from "firebase";
import { StyleSheet} from 'react-native'
import React, { Component } from "react";
import { Layout } from 'react-native-ui-kitten'
import { Loading } from "../../components/Loading";
import { generalStyle } from '../../shared/generalStyle'

//Tela que carrega depois da splash screen, redireciona para a Home, 
//caso logado, ou para a Tela de bem vindo
export class AuthLoadingScreen extends Component {  

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(
        user ? "Home" : "Landing"
      );
    });
  }
  render() {
    return (
      <Layout style = {generalStyle.container} >
        <Loading style = {styles.spinner} />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({ 
  spinner:{
    margin: 0,
    position: 'absolute',
    top: '50%',
  },
});

