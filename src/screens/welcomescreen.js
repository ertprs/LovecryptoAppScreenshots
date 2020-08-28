//Importações Externas
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Button,} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, StyleSheet, ImageBackground, Image, Linking, StatusBar} from 'react-native';
import { androidNavbar } from '../shared/constants'
//Importações Internas
import { clickInfoEvent } from '../shared/analyticsLog'
 
export const WelcomeScreen = ({navigation}) => {

  const login = async () => {
    navigation.navigate('Login')
  };

  const signup = async () => {
    navigation.navigate('Referal')
  };
  
  const moreAbout = () => {
    Linking.openURL('https://www.lovecrypto.net/').catch(err => console.error("Couldn't load page", err));
    clickInfoEvent('more about', 'welcome screen')
  };

  const openTerms = () => {
    navigation.navigate('Terms')
    clickInfoEvent('terms of use', 'welcome screen')
  };
   
  return(
    <SafeAreaView
      style={{
      flex: 1,
      }}>
            <StatusBar
        barStyle={ 'light-content'}
        backgroundColor={ '#7A05C8'}/>
      <ImageBackground source={require('../assets/images/welcome_bg.png')} style={styles.backgroundImg}/>
      <LinearGradient 
        colors={['#7A05C8', '#7A05C800']}
        style = {{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Image  style={styles.logoImg} source={require('../assets/images/logo_white.png')} ></Image>
        <Button  onPress={() => moreAbout()} status='control' appearance='ghost'>saiba mais</Button>
      </LinearGradient>
      <Layout style = {styles.buttonGroup}>
        <Button style = {styles.button}  size='large' status='success' appearance='filled' onPress={() => signup()}>Cadastro</Button>
        <Button style = {styles.button}  size='large' status='success' appearance='outline'onPress={() => login()} >Login</Button>
        <Button style = {styles.button}  size='large' status='primary' appearance='ghost' onPress={() => openTerms()} >Termos de Uso</Button>
      </Layout>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  buttonGroup: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    backgroundColor: 'transparent',
  },
  button:{
    margin: 6
  },
  logoImg:{
    width: 130,
    height: 25,
    marginTop: 8,
    marginLeft: 12,
  },
  backgroundImg:{
    height: '100%',
    width: null,
    flex: 1,
    resizeMode: 'cover',
  },
});