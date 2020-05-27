import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, ImageBackground, TouchableNativeFeedback} from 'react-native';
import {
  Layout,
  Text,
  Divider,
  Button, 
  Icon
} from '@ui-kitten/components';
import { Ionicons } from "@expo/vector-icons";
import  {AsyncStorage} from 'react-native';
import { getData } from '../../memoryAccess/getData'
import { Hint } from '../Hint'
// const getUser = async () => {
//   let usuario = null;
//   try {
//     usuario = await AsyncStorage.getItem('user') || 'none';
//   } catch (error) {
//     console.log(error.message);
//   } 
//   return JSON.parse(usuario)
// }

// export const HeadWallet  = (props) => {
  const StarIcon = (props) => (
    <Icon fill ='red' style={{width: 20, height: 20}} name='star'/>
  );
  
 export  class HeadWallet extends React.Component {


  

    constructor(props) {
      super(props);
      this.state = {
        points: 0,
        value: 0,
        currency: '',
        visible: false,
      };
    }
  

  // const [value, setValue] = useState(0)
  // const [points, setPoints] = useState(0)
  // const [currency, setCurrency ] = useState('')
  // const [visibleToolTipPoints, setVisibleToolTipPoints ] = useState(false)

  // useEffect( async () => {    
  //   user = await getData('@userData')
  //   setValue(user.balance)
  //   setPoints(user.points)
  //   setCurrency('cUSD')
  // }, [])

  
  async componentDidMount(){
    user = await getData('@userData')
    // console.log(user)
    this.setState({ 
      points: user.points,
      value: user.balance ,
      currency: 'cUSD',
    })
  
  }


  async componentDidUpdate(){
    user = await getData('@userData')
    // console.log(user)
    this.setState({ 
      points: user.points,
      value: user.balance ,
      // currency: 'cUSD',
    })
  
  }


  eyeIcon = () => (
    <Ionicons name= { visible ? 'md-eye' : 'md-eye-off'} size={20} color="#fff" />
  );
  
  toggleEye = () => {
    setVisible(!visible)
    console.log('mudou' + visible)
  }

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  ToastPontos = () => {

    ToastAndroid.showWithGravityAndOffset(
      'Você deve ter pelo menos 10000 pontos para converter seus pontos',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      100,
    );
    return null;
  };

  ToastRetirar = () => {

    ToastAndroid.showWithGravityAndOffset(
      'Seu saldo deve ser superior a 5 cUSD para solicitar retiradas',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      100,
    );
    return null;
  };
  
  requestWithdraw = () => {
    console.log('request withdraw')
    this.props.navigate('withdraw')
    return null;
  };

  // const [visible, setVisible] = React.useState(false);
  render(){
    return (
      <Layout style={{maxHeight: 260}}>
        <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}/>
        <Layout style = { styles.card}>
        
        <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Text category='label'>Seu saldo</Text>
          <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text category='h5' style={{marginTop: 8}}>{this.state.value.toFixed(2)}</Text>
            <Text category='c1' style={{marginTop: 16}}> {this.state.currency}</Text>
          </Layout>
          <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => this.ToastRetirar()}>
            <Text  style = {{marginTop: 32, marginBottom: 16}} status='primary'>retirar</Text>
          </TouchableNativeFeedback>
        </Layout>
        <Layout style={{borderWidth: 0.2, borderColor: '#ddd', height: 60}}></Layout>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Text category='label'>Pontuação</Text>
            <Text category='h5' style={{marginTop: 8}}> {this.state.points}</Text>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() =>  this.ToastPontos()}>
              <Text style = {{marginTop: 32, marginBottom: 16}} status='primary'>converter</Text>
            </TouchableNativeFeedback>
          </Layout>
        </Layout>
      </Layout> 
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    display: 'flex', 
    flexDirection: 'row',
    paddingHorizontal: 32, 
    paddingTop: 32, 
    margin: 16,
    marginBottom: 24, 
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -130
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
  },
  buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  }
});
