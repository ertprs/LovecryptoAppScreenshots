//Importações Externas
import {
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';

//Importações Internas
import { showToast } from '../shared/showToast';
import { multiplier, minimoSacavel } from '../shared/constants';
import { TooltipInfo} from '../shared/tooltipInfo';
import { simpleClickEvent, clickInfoEvent } from '../shared/analyticsLog';
import { min } from 'moment';

 
export const HeaderWallet = (props) => { 
  
  const user = useSelector(state => state.userState);
  const config = useSelector(state => state.configState);

  const theme = useTheme();
  var saldo = (user.balance / multiplier).toFixed(2)
  const retirarSaldo = (saldo) => {
    if(saldo >= minimoSacavel){
      props.navigation.navigate('Withdraw')
    }else{
      showToast('Seu saldo deve ser superior a ' + minimoSacavel +' cUSD para solicitar retiradas')
    }
    simpleClickEvent('retirar saldo')
  }

  const converterPontos = () => {
    showToast('Você deve ter pelo menos 1000 pontos para converter seus pontos')
    simpleClickEvent('converter pontos')
  }
 
  return (
    <Fragment>
      <Layout style = {{width: '100%', height: 130, backgroundColor: theme['color-primary-default']}}/>
      <Layout level = '2' style = {{ top: -130, marginBottom: -130, backgroundColor: 'transparent'}}>
        <Layout style = { styles.card}>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Text category='label' style = {styles.title}>Seu saldo</Text>
              <TooltipInfo text = 'Seu saldo aumenta ao converter seus pontos' onPress = { () =>  clickInfoEvent('saldo', 'Home')} />
            </Layout>
            <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Text category='h5' style={{marginTop: 8}}>{ saldo }</Text>
              <Text category='c1' style={{marginTop: 16}}> { config.currency }</Text>
            </Layout>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => retirarSaldo( saldo)}>
              <Text  style = {{marginTop: 32}} status='primary'>retirar</Text>
            </TouchableNativeFeedback>
          </Layout> 
          
          <Layout style={{borderWidth: 0.2, borderColor: '#666', height: 70}}></Layout>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Text category='label' style = {styles.title}>Pontuação</Text>
              <TooltipInfo text = 'Você ganha pontos ao responder pesquisas' onPress = { () =>  clickInfoEvent('pontos', 'Home')}/>
            </Layout>
              <Text category='h5' style={{marginTop: 8}}>{ user.points }</Text>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => converterPontos()}>
              <Text style = {{marginTop: 32}} status='primary'>converter</Text>
            </TouchableNativeFeedback>
          </Layout>
        </Layout>
      </Layout>
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
