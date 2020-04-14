import React, { Component } from "react";
import { ImageBackground }  from 'react-native';
import { AuthForm } from "../../components/AuthForm";
import { Button, Layout} from 'react-native-ui-kitten';
import { ScrollView, StyleSheet, StatusBar, Image } from "react-native";





const haveAccount = async () =>  {
  this.props.navigation.navigate("SignupScreen");  
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
    flexDirection: 'column',
    flexWrap: 'wrap',
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
    resizeMode: 'cover', // or 'stretch'
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

export class LoginScreen extends Component {
  
  state = {
    mediumValue: '',
    value: '',
    secureTextEntry: true,
    primaryChecked: false,
  };

  onMediumTextChange = (mediumValue) => {
    this.setState({ mediumValue });
  };
  
  onChangeText = (value) => {
    this.setState({ value });
  };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry });
  };
  
  renderIcon = (style) => {
    const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  onPrimaryChange = (primaryChecked) => {
    this.setState({ primaryChecked });
  };

  render() {
    return (
      <ImageBackground source={require('../../../assets/images/login_bg.png')} style={styles.backgroundImg}>
        <ScrollView>
          <Layout style={styles.container}>
            <Layout style={styles.title}>
              <Image  style={{height: 40, resizeMode: 'contain'}} source={require('../../../assets/images/logo_white.png')} ></Image>
            </Layout>
            <AuthForm/>
            <Button  appearance='ghost'  status='control' onPress={() =>  this.props.navigation.navigate("SignupScreen")}>Não tem conta? Cadastre-se</Button>
          </Layout>    
        </ScrollView>
      </ImageBackground>
    );
  }
}
