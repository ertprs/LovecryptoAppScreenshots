//Importações Externas
import * as Yup from 'yup';
import React, { useContext, useState}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Text, Layout, Icon } from '@ui-kitten/components';
import {  SafeAreaView, StyleSheet, ScrollView}  from 'react-native';

//Importações Internas
import { Account } from '../components/account';
import {ThemeContext} from '../../theme-context';
import  ErrorMessage from '../components/errormenssage'
import { HeroHeader } from '../components/heroHeader';
import { TopNavigationHeader } from '../shared/topNavigation';
import { setFiatTransference, setCryptoTransference} from '../store/actions/withdraw'
 

//Regras de validação
const validationSchema = Yup.object().shape({
    amount: Yup.number()
    .label('amount')
    .required('É preciso inserir um valor valido'),
})
import { multiplier } from '../shared/constants/'
import { showToast } from '../shared/showToast';
import { minimoSacavel } from '../shared/constants';
const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

const MinusIcon = (props) => (
  <Icon {...props} name='minus-outline'/>
);
  
export const RequestWithDrawScreen = (props) => {
  //unidade que soma ao valor ou diminui. Usado nas contas de transferencia
  const unit = minimoSacavel;

  const dispatch = useDispatch();
  const state = useSelector(state => state)
  
  const [value, setValue] = useState(0);
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const type = props.route.params.type;

  const requestCryptoTransfer = (amount) => {
    dispatch(setCryptoTransference(state.withdrawState.cryptoWallet.id, state.withdrawState.cryptoWallet.address, amount))
  };

  const requestFiatTransfer = (amount) => {
    dispatch(setFiatTransference(state.userState.cpf, state.withdrawState.fiatWallet.agency, state.withdrawState.fiatWallet.account, amount))
  }

  const request = (amount) => {
    if(amount <= state.userState.balance.toFixed(2)){
      if(type == 'crypto'){
        requestCryptoTransfer(amount)
        props.navigation.navigate("Confirmwithdraw", {type:'crypto', amount: amount})
      }else{
        requestFiatTransfer(amount)
        props.navigation.navigate("Confirmwithdraw", {type:'fiat', amount: amount})
      }
    }else{
      console.log("SALDO INSUFICIENTE " + amount)
    }
    
  } 

  const Indicator = () => (
    <Layout level = '2' style = {{justifyContent: 'center', alignItems: 'center', padding: 24, borderRadius: 10, borderWidth: 1, borderColor: '#E4E9F2' }}>
      <Text appearance = 'hint'>saldo disponível</Text>
      <Text category = 'h6'>{ ( parseFloat(state.userState.balance) / multiplier ).toFixed(2) } {state.configState.currency}</Text>
    </Layout>
  )
    console.log(state.userState.balance)
    console.log(multiplier)
  return(
    <SafeAreaView
      style={{
      flex: 1,
      heigth: '100%',
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',    
      }}>
      <TopNavigationHeader navigation = {props.navigation}  title = 'Saque' subtitle = 'Quantidade'/>
      <ScrollView>
        <HeroHeader title = 'Saque' subtitle = 'Quanto deseja retirar?'/>
          <Layout style = {{padding: 24, width: '100%', flexDirection: 'row',  justifyContent: 'space-between', top: -10, marginBottom: -10, borderRadius: 10}}>
            <Layout style = {{ flex: 1, backgroundColor: 'transparent'}}>
              <Text category='h6'style = {{fontWeight: 'bold'}} >Selecione o total a retirar</Text>
            </Layout>
            <Indicator/>
          </Layout>
      
          {/* COMEÇO Seleção do Valor */}
          <Layout style = {{width: '100%', justifyContent: 'space-between', padding: 24, flexDirection: 'row',}}>
            <Button style={styles.button} appearance='ghost' status={ value - unit > 0 ? 'info' : 'basic'} onPress ={() => value - unit > 0 ? setValue(value - unit) : showToast('Saques devem ser maior que 0')} accessoryLeft={MinusIcon}/>
            <Layout>
              <Layout style = {{flexDirection: 'row'}}>
                <Text status = 'primary' style = {{fontSize: 50}}>{(value).toFixed(2)}</Text>            
                <Text Text category='h3' status = 'primary' style = {{marginTop: 20}}> {state.configState.currency}</Text>
              </Layout>
              { value > state.userState.balance &&
              <ErrorMessage errorValue = {'O seu saldo é insuficiente'}/>
              }
            </Layout>
            <Button style = {styles.button} appearance = 'ghost' status = { (value + unit) * multiplier < state.userState.balance ? 'info' : 'basic'} onPress = { () => (value + unit) * multiplier <= state.userState.balance ? setValue(value + unit) : showToast('Deve ter mais ' + unit + ' ' + state.configState.currency + ' de saldo')} accessoryLeft={PlusIcon}/>
          </Layout>   
          {/* FIM Seleção do Valor */}
          <Layout style = {{padding: 24,    bottom: 0 , width: '100%'}} >
            <Button status='success' disabled = { value > state.userState.balance || value == 0} onPress = { () => request(value)}>Confirmar</Button>
          </Layout>
          <Layout style = {{padding: 24}}> 
            <Text category='s1' style = {{fontWeight: 'bold', marginVertical: 24}}>Conta Selecionada</Text>
            <Account accessory = {'alterable'} type = {type} navigation = {props.navigation}/>
          </Layout>
        </ScrollView>     
      </SafeAreaView>
  )
};
 
const styles = StyleSheet.create({
  buttonCase:{
    width: '100%',
    padding: 4,
    padding: 50,
    paddingHorizontal: 48,
  },
});