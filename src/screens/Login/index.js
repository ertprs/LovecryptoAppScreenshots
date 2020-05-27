import React from "react";
import { ImageBackground }  from 'react-native';
import { AuthForm } from "../../components/AuthForm";
import { Button, Layout} from '@ui-kitten/components';
import { ScrollView, StyleSheet, Image } from "react-native";

export const LoginScreen = (props) => { 
  return (
    <ImageBackground source={require('../../assets/images/login_bg.png')} style={styles.backgroundImg}>
      <ScrollView>
        <Layout style={styles.container}>
          <Layout style={styles.title}>
            <Image  style={{height: 40, width: 260, resizeMode: 'contain'}} source={require('../../assets/images/logo_white.png')} ></Image>
          </Layout>
          <AuthForm navigation = {props.navigation}/>
          <Button  appearance='ghost'  status='control' onPress={() =>  props.navigation.navigate("SignupScreen")}>Não tem conta? Cadastre-se</Button>
        </Layout>    
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 26,
  },
  backgroundImg:{
    height: 1280,
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  login: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 48,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'yellow',

  },
  section: {
     paddingVertical: 8,
     width: '100%',
     backgroundColor: 'green',
     flexDirection: 'column',
     flexWrap: 'wrap',
     alignItems: 'flex-end'
  },
  buttonCase:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  button: { 
    width: '100%'
  },
});