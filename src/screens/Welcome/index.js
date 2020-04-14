import React, {Component} from "react";
import { Layout, Text, Button} from 'react-native-ui-kitten'

import { generalStyle } from '../../shared/generalStyle';
import { StyleSheet,  Image, Linking, Dimensions} from "react-native";

//Serve como a tela inicial do usuário deslogado
export class WelcomeScreen extends Component {

  login = async () => {
    this.props.navigation.navigate('LoginScreen')
  };

  signup = async () => {
    this.props.navigation.navigate('SignupScreen')
  };
  
  moreAbout = () => {
    Linking.openURL('https://www.lovecrypto.net/').catch(err => console.error("Couldn't load page", err));
  };

  openTerms = () => {
    Linking.openURL('https://lovecrypto.net/terms-of-use/').catch(err => console.error("Couldn't load page", err));
  };

  render(){
    // console.log(Dimensions.get("window").width)
    return (
      <Layout style = { styles.container }>
        <Layout style = {styles.title}>
          <Image  style={styles.logoImg} source={require('../../../assets/images/logo.png')} ></Image>
          <Button  onPress={() => this.moreAbout()} status='success' appearance='ghost'>saiba mais</Button>
        </Layout>
        <Image style = {styles.banner} source={require('../../../assets/images/earn_reward.png')}></Image>
        <Layout style = {styles.buttonGroup}>
          <Button style = {generalStyle.button}  size='large' status='success' appearance='filled' onPress={() => this.signup()}>Cadastro</Button>
          <Button style = {generalStyle.button}  size='large' status='success' appearance='outline'onPress={() => this.login()} >Login</Button>
          <Button style = {generalStyle.button}  size='large' status='primary' appearance='ghost' onPress={() => this.openTerms()} >Termos de Uso</Button>
        </Layout>
      </Layout>

    );
  }
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  banner: {
    resizeMode: 'contain',
    maxHeight: height,
    maxWidth: width
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    paddingHorizontal: 36,
  },
  title: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 26,
  },
  logoImg:{
    width: 130,
    height: 25,
    marginTop: 8,
    marginLeft: 12,
  }
});