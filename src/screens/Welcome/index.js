import React, {Component} from "react";
import { Layout, Text, Button} from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient';
import { generalStyle } from '../../shared/generalStyle';
import { StyleSheet,  Image, Linking, Dimensions, ImageBackground, ScrollView} from "react-native";

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
      // <Layout style = { styles.container }>
      //   <Layout style = {styles.title}>
      //     <Image  style={styles.logoImg} source={require('../../assets/images/logo.png')} ></Image>
      //     <Button  onPress={() => this.moreAbout()} status='success' appearance='ghost'>saiba mais</Button>
      //   </Layout>
      //   <Image style = {styles.banner} source={require('../../assets/images/earn_reward.png')}></Image>
      //   <Layout style = {styles.buttonGroup}>
      //     <Button style = {generalStyle.button}  size='large' status='success' appearance='filled' onPress={() => this.signup()}>Cadastro</Button>
      //     <Button style = {generalStyle.button}  size='large' status='success' appearance='outline'onPress={() => this.login()} >Login</Button>
      //     <Button style = {generalStyle.button}  size='large' status='primary' appearance='ghost' onPress={() => this.openTerms()} >Termos de Uso</Button>
      //   </Layout>
      // </Layout>
    <ImageBackground source={require('../../assets/images/welcome_bg.png')} style={styles.backgroundImg}>
      {/* <ScrollView> */}
     
      {/* <Layout style = {styles.title}>
        <Image  style={styles.logoImg} source={require('../../assets/images/logo.png')} ></Image>
        <Button  onPress={() => this.moreAbout()} status='success' appearance='ghost'>saiba mais</Button>
      </Layout> */}
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.001)']}
        style={[{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -3,
          // height: 200,
        }, styles.title]}
      >
        <Image  style={styles.logoImg} source={require('../../assets/images/logo_white.png')} ></Image>
        <Button  onPress={() => this.moreAbout()} status='control' appearance='ghost'>saiba mais</Button>

      </LinearGradient>
      {/* <Layout style = {{ position: 'absolute', top: 250, backgroundColor: 'transparent'}}>
        <Text category='h1' style = {{ paddingLeft: 40}}>Ganhe</Text>
        <Text category='h1' style = {{backgroundColor: '#ffcf03', paddingLeft: 40, paddingBottom: 5, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10}} status = 'control'>Recompensas</Text>
        <Text category='h1' style = {{ paddingLeft: 40}}>por sua</Text>
        <Text category='h1' style = {{ paddingLeft: 40}}>opnião</Text>
      </Layout> */}
        {/* <Layout style={styles.container}> */}
          {/* <Layout style={styles.title}>
            <Image  style={{height: 40, width: 260, resizeMode: 'contain'}} source={require('../../assets/images/logo_white.png')} ></Image>
          </Layout> */}
          {/* <AuthForm/> */}
          {/* <Button  appearance='ghost'  status='control' onPress={() =>  props.navigation.navigate("SignupScreen")}>Não tem conta? Cadastre-se</Button> */}
          <Layout style = {styles.buttonGroup}>
           <Button style = {generalStyle.button}  size='large' status='success' appearance='filled' onPress={() => this.signup()}>Cadastro</Button>
           <Button style = {generalStyle.button}  size='large' status='success' appearance='outline'onPress={() => this.login()} >Login</Button>
           <Button style = {generalStyle.button}  size='large' status='primary' appearance='ghost' onPress={() => this.openTerms()} >Termos de Uso</Button>
         </Layout>
        {/* </Layout>     */}
      {/* </ScrollView> */}
    </ImageBackground>
    );
  }
}

// const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   width: '100%'
  // },
  // banner: {
  //   resizeMode: 'contain',
  //   maxHeight: height,
  //   maxWidth: width
  // },
  buttonGroup: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    paddingHorizontal: 36,
    backgroundColor: 'transparent',
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
  },




  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  // title: {
  //   flexDirection: 'column',
  //   flexWrap: 'wrap',
  //   paddingVertical: 16,
  //   paddingHorizontal: 16,
  //   paddingTop: 32,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   backgroundColor: 'transparent',
  //   marginTop: 26,
  // },
  backgroundImg:{
    height: null,
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