//Importações Externas
import React, { useEffect } from 'react';
import { SafeAreaView, Image } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {  Layout, Text, Button, useTheme } from '@ui-kitten/components';
 


//Importações Internas
import { Account } from '../components/account';
import { multiplier } from '../shared/constants';
import { CustomHeader } from '../shared/customHeader';
import { addUserBalance } from '../store/actions/user';
import { resquestWithrawCrypto } from '../api/requestWithdrawCrypto';
import { resquestWithrawFiat } from '../api/requestWithdrawFiat';
 
export const ConfirmWithdrawScreen = (props) => {
 
    const wallet = useSelector(state => state.withdrawState);
    const user = useSelector(state => state.userState);
    const type = props.route.params.type; 
   
    const dispatch = useDispatch()
    // const amount = props.route.params.amount
    const theme = useTheme(); 
    const renderContent = () => {
        return (
            <>
            <Layout style = {{padding: 24, alignItems: 'center', top: -10, marginBottom: -10, borderRadius: 10}}>
            <Animatable.View animation="slideInUp" duration = {2000}>
                <Image style = {{height: 128, width: 128, margin: 24}} source={require('../assets/images/success.png')}/>
            </Animatable.View>
            <Animatable.View animation="pulse" duration = {2000} style = {{flexDirection: 'row', backgroundColor: 'transparent'}}>
                <Text category = 'h1' status = 'success'>{type == 'crypto' ? (wallet.cryptoTransference.ammount / multiplier).toFixed(2) : (wallet.fiatTransference.ammount).toFixed(2)}</Text>
                <Text category = 'h5' status = 'success'  style = {{marginTop: 15}}> cUSD</Text>
            </Animatable.View>
        </Layout>
        <Layout style = {{flexDirection:'row', justifyContent:'space-around', padding: 24}}>
            {type == 'crypto' && 
                <Text category = 'c1' appearance = 'hint'>Em breve  a transferência deverá aparecer na conta</Text>
            }
            {type == 'fiat' && 
                <Text category = 'c1' appearance = 'hint'>Em breve você receberá um sms com o link para saque</Text>
            }
        </Layout>  
        <Layout style = {{padding: 16,  bottom: 0 , width: '100%'}} >
            <Button 
            onPress = { () => props.navigation.navigate('Home')}
            status='success'    
            >Continuar</Button>
        </Layout>
        <Layout style = {{padding: 24}}> 
            <Text category='s1' style = {{fontWeight: 'bold', marginVertical: 24}}>{type == 'crypto' ? 'Conta de Destino' : 'Telefone de Destino'}</Text>
            <Animatable.View  animation="pulse" duration = {3000}  >
             <Account type = {type} navigation = {props.navigation}/>
            </Animatable.View>
        </Layout>
        </>
        )}

    useEffect(() => {
       
        if(type == 'crypto'){
            //console.log('TRANSFERENCIA ' + wallet.cryptoTransference.address + ' ,' + wallet.cryptoTransference.ammount)
            resquestWithrawCrypto(wallet.cryptoTransference.address , wallet.cryptoTransference.ammount).then( response => {
                console.log(response.data)
                dispatch(addUserBalance(user.balance - wallet.cryptoTransference.ammount))
            }).catch( error => {
              console.log(error.response.data)
            })
        }else if (type == 'fiat'){
            resquestWithrawFiat(wallet.fiatTransference.phone , wallet.cryptoTransference.ammount).then( response => {
                console.log(response.data)
                dispatch(addUserBalance(user.balance - wallet.fiatTransference.ammount))
            }).catch( error => {
              console.log(error.response.data)
            })
        }
    }, [])
 
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ReactNativeParallaxHeader
                headerMinHeight={56}
                headerMaxHeight={220}
                extraScrollHeight={20}
                navbarColor= {theme['color-primary-default']}
                backgroundImage={require('../assets/images/confirm_bg.jpg')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Sucesso'} subtitle = {'teddf'}/>}
                renderContent={renderContent}
            />
        </SafeAreaView>
    );
};