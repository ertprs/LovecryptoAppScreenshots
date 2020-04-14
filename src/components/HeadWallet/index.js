import React from 'react';
import { StyleSheet, ToastAndroid, ImageBackground} from 'react-native';
import {
  Layout,
  Text,
  Button,
} from 'react-native-ui-kitten';
import { Ionicons } from "@expo/vector-icons";
import {AsyncStorage} from 'react-native';

const placeholderValue = '--';
const placeholderCurrency = '-----';

const getUser = async () => {
  let usuario = null;
  try {
    usuario = await AsyncStorage.getItem('user') || 'none';
  } catch (error) {
    console.log(error.message);
  } 
  return JSON.parse(usuario)
}

export class HeadWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'pontos',
      visible: true,
    };
  }

  //Recupera dados locais
  componentDidMount(){
    getUser().then(data => {
      this.setState({ 
        value: data.points,
      })
    });
  }


  eyeIcon = () => (
    <Ionicons name= { this.state.visible ? 'md-eye' : 'md-eye-off'} size={20} color="#fff" />
  );
  
  toggleEye = () => {
    this.state.visible = !this.state.visible
    console.log('mudou' + this.state.visible)
  }

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  // a component that calls the imperative ToastAndroid API
  Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Saldo deve ser acima de U$ 5.00",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  };

  requestWithdraw = () => {
    console.log('request withdraw')
    this.props.navigate('withdraw')
    return null;
  };

render(){
  return (
    
    <ImageBackground source={require('../../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
      <Layout style = {styles.content}>
        <Layout style = {styles.info}>
          <Layout style = {{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row'}}>
            <Text category='h1' status='control' style = {styles.value}>{ this.state.visible ? this.state.value : placeholderValue } </Text>
            <Text category='h3' status='control' style = {styles.currency}>{ this.state.visible ? this.state.currency : placeholderCurrency} </Text>
          </Layout>
          <Layout style = {{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', marginTop: 8}}>
            <Text category='c2' status='control' style = {styles.text}>Sua pontuação</Text> 
          </Layout>
        </Layout>
        {/* <Layout style = {{  width: 50, marginVertical: 60, backgroundColor: 'red'}}>
          <Button style={styles.button} appearance='ghost' status='danger' icon={this.eyeIcon} onPress = {this.toggleEye} />
        </Layout> */}
      </Layout>
    </ImageBackground>
  
  );
  }
}

const styles = StyleSheet.create({
  value:{
    // paddingTop: 8,
  },
  currency:{
    paddingTop: 6,
  },
  info:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',    
  },
  content:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',    
    width: '100%',     
    paddingHorizontal: 48,
    marginVertical: 16,
  },
  topInfo:{
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    textAlignVertical: 'center'
  },  
  backgroundImg:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 200,
    marginTop: 25,
  },
  buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  }
});
