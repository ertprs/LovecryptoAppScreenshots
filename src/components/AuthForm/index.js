import React from "react";
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components'
// import { FacebookAuth, GoogleAuth } from "./SocialAuth";
import { Signup } from "./emailAuth/signup";
import { Login } from './emailAuth/login'
import { SocialAuth } from './SocialAuth'

//Reune todas as formas de Login/Signup
export const AuthForm = props => {
  const { isSignup } = props;

  return (
    <Layout style={styles.container}>
      <Layout  style={styles.formHeading}>
        <Text  category='h3' status='control'>
          {isSignup ? "Cadastro" : "Login"}
        </Text>
        <Text category='s1' appearance = 's1' status='control'>
          {isSignup ? "Entre para a comunidade Lovecrypto" : "Acesse sua conta"}
        </Text>
        
      </Layout>
      {
        isSignup ? <Signup/> : <Login navigation = {props.navigation}/>
      }
      
      {/* <Layout style={styles.buttonRow}>
        <FacebookAuth />
        <GoogleAuth />
      </Layout> */}
      <SocialAuth/>
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
  buttonRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    paddingTop: 32,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  section:{
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 48,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'red'
  },
  formHeading:{
    paddingTop: 24,
    backgroundColor: 'transparent',
  }
});