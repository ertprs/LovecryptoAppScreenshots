//Importações Externas
import {
  Layout,
  Text,
  useTheme,
  Modal,
  Card,
  Icon, 
  Button
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import React, { Fragment, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableNativeFeedback , Platform } from 'react-native';

//Importações Internas
import { showErrorToast, showToast } from '../shared/showToast';
import { TooltipInfo} from '../shared/tooltipInfo';
import { generalStyle } from '../shared/generalStyle';
import { addUserBalance, addUserPoints }from '../store/actions/user';
import { simpleClickEvent, clickInfoEvent } from '../shared/analyticsLog';
import { multiplier, minimoSacavel, minimoPontosConversivel } from '../shared/constants';
import { convertPointsApi } from '../api/convertPoints'
 
export const HeaderWallet = (props) => { 

  const theme = useTheme();

  const dispatch = useDispatch()

  const user = useSelector(state => state.userState);
  const config = useSelector(state => state.configState);
  
  const [visible, setVisible] = useState(false);

  var saldo = (user.balance / multiplier).toFixed(2);
 
  const retirarSaldo = (saldo) => {
     
     
       if(auth().currentUser.emailVerified){
         props.navigation.navigate('Withdraw')
       }else{
         auth().currentUser.sendEmailVerification()
        showToast('Para realizar saques você deve antes confirmar seu email ' + user.email + '. Cheque sua caixa de entrada')
      }
      // props.navigation.navigate('Withdraw')
     
     simpleClickEvent('retirar saldo')
  }

  const converterPontos = () => {
    if(user.points <= minimoPontosConversivel){ 
      showToast(`Você deve ter pelo menos ${minimoPontosConversivel} pontos para converter em 1 ${config.currency}`)
      simpleClickEvent('converter pontos')
    }else{
      setVisible(true)
    }
  }

  const converter = async () => {
    setVisible(false)
     
   
      convertPointsApi().then( async () => {
        dispatch(addUserPoints(user.points - minimoPontosConversivel))
        dispatch(addUserBalance(user.balance + multiplier))
        showToast('Pontos Convertidos')
      }).catch(error =>{
        console.log(error.response.data.message)
        showErrorToast(error.response.data.message)
      })
      
    
    

    
  };

  return (
    <Fragment>
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
            <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
            <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Icon fill='white' style = {{height: 24, width: 24, alginSelf: 'right'}} name='flip-2-outline'/>
            </Layout>
            <Text  style = {{marginTop: 8}} category = 'h6'>Converter</Text>
            <Text  style = {{marginTop: 8, textAlign: 'center'}} category = 'p1' appearance = 'hint'>Tem certeza que deseja converter {minimoPontosConversivel} pontos em 1 {config.currency}?</Text>
            <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                  CANCELAR
                </Button>
                <Button style = {{margin: 12}} status = 'success' onPress={() => converter()}>
                  CONVERTER PONTOS
                </Button>
            </Layout>
            </Layout>          
        </Card>
      </Modal>
      {/* <Layout style = {{width: '100%', height: 130, backgroundColor: theme['color-primary-default']}}/> */}
      
      <Animatable.View  animation="slideInUp" duration = {2000} style = {{width:'100%', marginTop: Platform.OS == 'ios' ? 40 : 70, backgroundColor: 'transparent'}}>
        <Layout style = { styles.card}>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent'}}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
              <Text category='label' style = {styles.title}>Seu saldo</Text>
              <TooltipInfo text = 'Seu saldo aumenta ao converter seus pontos' onPress = { () =>  clickInfoEvent('saldo', 'Home')} />
            </Layout>
            <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
              <Text category='h5' style={{marginTop: 8}}>{ saldo }</Text>
              <Text category='c1' style={{marginTop: 16}}> { config.currency }</Text>
            </Layout>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => retirarSaldo(saldo)}>
              <Text  style = {{marginTop: 32}} status='primary'>retirar</Text>
            </TouchableNativeFeedback>
          </Layout> 
          
          <Layout style={{borderWidth: 0.2, borderColor: '#666', height: 70}}></Layout>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent'}}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center',  backgroundColor: 'transparent'}}>
              <Text category='label' style = {styles.title}>Pontuação</Text>
              <TooltipInfo text = 'Você ganha pontos ao responder pesquisas' onPress = { () =>  clickInfoEvent('pontos', 'Home')}/>
            </Layout>
              <Text category='h5' style={{marginTop: 8}}>{ user.points }</Text>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => converterPontos()}>
              <Text style = {{marginTop: 32}} status='primary'>converter</Text>
            </TouchableNativeFeedback>
          </Layout>
        </Layout>
      </Animatable.View>
    </Fragment>
  );
}
  
const styles = StyleSheet.create({
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    flexDirection: 'row',
    padding: 24, 
    margin: 16,
    marginTop: 0,
    borderRadius: 10, 
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  currency:{
    paddingTop: 6,
  },
  title: {
    marginRight: 8, 
    fontWeight: 'bold'
  }
});
