//Importações Externas
import * as Yup from 'yup';
import React, { useContext, useState}  from "react";
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import {  SafeAreaView, StyleSheet}  from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { Button, Text, Layout, Icon, useTheme } from '@ui-kitten/components';
 
//Importações Internas
import { showToast } from '../shared/showToast';
import { Account } from '../components/account';
import { multiplier } from '../shared/constants';
import { ThemeContext } from '../../theme-context';
import { CustomHeader } from '../shared/customHeader';
import  ErrorMessage from '../components/errormenssage';
import { setFiatTransference, setCryptoTransference} from '../store/actions/withdraw';
 
//Regras de validação
const validationSchema = Yup.object().shape({
    amount: Yup.number()
    .label('amount')
    .required('É preciso inserir um valor valido'),
})

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

const MinusIcon = (props) => (
  <Icon {...props} name='minus-outline'/>
);
  
export const RequestWithDrawScreen = (props) => {
  const renderContent = () => {
    return (
      <>
      <Layout style = {{padding: 24, width: '100%', flexDirection: 'row',  justifyContent: 'space-between'}}>
      <Layout style = {{ flex: 1, backgroundColor: 'transparent'}}>
        <Text category='h6'style = {{fontWeight: 'bold'}} >Selecione o total a retirar</Text>
      </Layout>
      <Animatable.View  animation="pulse" duration = {2000}  >
        <Indicator/>
      </Animatable.View>
    </Layout>
    {/* COMEÇO Seleção do Valor */}
    <Layout style = {{width: '100%', justifyContent: 'space-between', padding: 24, flexDirection: 'row',}}>
      <Button style={styles.button} appearance='ghost' status={ value - unit >= 0 ? 'info' : 'basic'} onPress ={() => value - unit >= 0 ? setValue(value - unit) : showToast('Saques devem ser maior que 0')} accessoryLeft={MinusIcon}/>
      <Layout>
      <Animatable.View  animation="bounceIn" duration = {2000} style = {{width:'100%', flexDirection: 'row', backgroundColor: 'transparent'}}>
     
          <Text status = 'info' style = {{fontSize: 50}}>{(value).toFixed(2)}</Text>            
          <Text Text category='h3' status = 'info' style = {{marginTop: 20}}> {state.configState.currency}</Text>
        </Animatable.View>
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
      <Text category='s1' style = {{fontWeight: 'bold', marginVertical: 24}}>{type == 'crypto' ? 'Conta Selecionada' : 'Telefone Selecionado'}</Text>
      <Animatable.View  animation="pulse" duration = {3000}  >
      <Account accessory = {'alterable'} type = {type} navigation = {props.navigation}/>
      </Animatable.View>
    </Layout>
    </>

    )
  }

  //unidade que soma ao valor ou diminui. Usado nas contas de transferencia
  const unit = 0.1;

  const dispatch = useDispatch();
  const state = useSelector(state => state)
  
  const [value, setValue] = useState(0);
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const type = props.route.params.type;

  const theme = useTheme(); 

  const requestCryptoTransfer = (amount) => {
    dispatch(setCryptoTransference(state.withdrawState.cryptoWallet.id, state.withdrawState.cryptoWallet.address, amount * multiplier))
  };

  const requestFiatTransfer = (amount) => {
    dispatch(setFiatTransference(state.userState.cpf, state.withdrawState.fiatWallet.phone, amount))
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
        <ReactNativeParallaxHeader
          headerMinHeight={56}
          headerMaxHeight={220}
          extraScrollHeight={20}
          navbarColor= {theme['color-primary-default']}
          backgroundImage={ require('../assets/images/wallet_bg.jpg') }
          renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Saque'} subtitle = {'teddf'}/>}
          renderContent={renderContent}
        />
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