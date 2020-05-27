import * as firebase from "firebase";
import { StyleSheet} from 'react-native'
import React, { useEffect } from "react";
import { Layout } from '@ui-kitten/components'
import { Loading } from "../../components/Loading";
import { generalStyle } from '../../shared/generalStyle'

//Tela que carrega depois da splash screen, redireciona para a Home, 
//caso logado, ou para a Tela de bem vindo
export const AuthLoadingScreen = (props) =>{  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(
        user ? "Home" : "Landing"
      );
    });
  })

  return (
    <Layout style = {generalStyle.container} >
      <Loading style = {styles.spinner} />
    </Layout>
  );
}

const styles = StyleSheet.create({ 
  spinner:{
    margin: 0,
    position: 'absolute',
    top: '50%',
  },
});

