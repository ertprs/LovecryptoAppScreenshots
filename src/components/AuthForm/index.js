import React from "react";
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components'
import { Signup } from "./emailAuth/signup";
import { Login } from './emailAuth/login'
import { SocialAuth } from './SocialAuth'

//Reune todas as formas de Login/Signup
export const AuthForm = props => {

  const isSignup = props.isSignup;
  
  return (
    <Layout style={styles.container}>
      <Layout  style={{backgroundColor: 'transparent',}}>
        <Text  category='h3' status='control'>
          {isSignup ? "Cadastro" : "Login"}
        </Text>
        <Text category='s1' appearance = 's1' status='control' style = {{marginBottom: 16,}}>
          {isSignup ? "Entre para a comunidade Lovecrypto" : "Acesse sua conta"}
        </Text>
      </Layout>
      {
        isSignup ? <Signup/> : <Login navigation = {props.navigation}/>
      }
      <SocialAuth/>
      <Layout style = {{padding: 24, alignItems: 'center', backgroundColor: 'transparent'}}>
      {isSignup ? 
       <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('Login')} status='control'>Já tem conta? Entre</Button>
       :
       <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('Signup')} status='control'>Não tem Conta? Crie</Button> 
       }
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    width: '100%',
    backgroundColor: 'transparent'
  },
});