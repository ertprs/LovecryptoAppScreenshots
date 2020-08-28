//Importações Externas
import React, { useEffect } from 'react';
import { SafeAreaView, Image } from 'react-native';
import { HeroHeader } from '../components/heroHeader';
import { useSelector, useDispatch} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import {  Layout, Text, Button, } from '@ui-kitten/components';
 
//Importações Internas
import { Account } from '../components/account';
import { addUserBalance } from '../store/actions/user';
import { TopNavigationHeader } from '../shared/topNavigation';
import { resquestWithrawCrypto } from '../api/requestWithdrawCrypto'
import { multiplier } from '../shared/constants';
 
export const ConfirmWithdrawScreen = (props) => {
 
    const wallet = useSelector(state => state.withdrawState);
    const user = useSelector(state => state.userState);
    const type = props.route.params.type;
    const dispatch = useDispatch()
    const amount = props.route.params.amount
     
    useEffect(() => {
      
        if(type == 'crypto'){
            // console.log(wallet.cryptoWallet.address + ' ,' + amount)
            resquestWithrawCrypto(wallet.cryptoTransference.address , amount * multiplier).then(response => {
                console.log("RESPOSTA TRANSFERENCIA " + response)
                dispatch(addUserBalance(user.balance - amount * multiplier))
            })
        }
    }, [])
 
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationHeader navigation = {props.navigation}  title = 'Retirada' subtitle = 'Confirmação'/>  
            <ScrollView>
                <HeroHeader title = 'Sucesso' subtitle = 'A transação foi confirmada com sucesso'/>
                <Layout style = {{padding: 24, alignItems: 'center', top: -10, marginBottom: -10, borderRadius: 10}}>
                    <Image style = {{height: 128, width: 128, margin: 24}} source={require('../assets/images/success.png')}/>
                    <Layout style = {{flexDirection: 'row'}}>
                        <Text category = 'h1' status = 'primary'>{type == 'crypto' ? (wallet.cryptoTransference.ammount).toFixed(2) : (wallet.fiatTransference.ammount).toFixed(2)}</Text>
                        <Text category = 'h5' status = 'primary'  style = {{marginTop: 15}}> cUSD</Text>
                    </Layout>
                </Layout>
                <Layout style = {{flexDirection:'row', justifyContent:'space-around', padding: 24}}>
                    <Text category = 'c1' appearance = 'hint'>Em breve  a transferência deverá aparecer na conta</Text>
                </Layout>  
                <Layout style = {{padding: 16,  bottom: 0 , width: '100%'}} >
                    <Button 
                    onPress = { () => props.navigation.navigate('Home')}
                    status='success'    
                    >Continuar</Button>
                </Layout>
                <Layout style = {{padding: 24}}> 
                    <Text category='s1' style = {{fontWeight: 'bold', marginVertical: 24}}>Conta de Destino</Text>
                    <Account type = {type} navigation = {props.navigation}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};