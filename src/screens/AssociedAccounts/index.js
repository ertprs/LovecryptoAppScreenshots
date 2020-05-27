import React from "react";
import { StyleSheet } from "react-native";
 
import {
  Layout,
  Button,
  Text,
  List
} from '@ui-kitten/components';
import { ImageBackground, Image} from 'react-native'

import { ScrollView } from "react-native-gesture-handler";
import { ProfileOption} from '../../components/ProfileOption'
import { BankAccount } from '../../components/BankAccount'
const data =  [
  { name: 'Bradesco', type: 'fiat',  hash: '', account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'fiat', hash: '',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'crypto', hash: '0x5 ... 6f5eb8ba1b7eb',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'fiat', hash: '',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
 ]

export const AssociedAccountsScreen = (props) => {
 
 
  const renderItem = ({ item, index }) => (
    <BankAccount route ='Notifications' title = {item.name} info = {item.account} image = {item.image} icon = 'settings-2-outline' navigation = {props.navigation}/>
  );
   

  return (
   
    <ScrollView>
       <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
        <Image source={require('../../assets/images/Ranking.png')} style={styles.jumboImage}></Image>
        
      </ImageBackground>
      <Layout style = { styles.card}>
        <Text  style = {{top: -60, left: -85}} status  = 'control' category = 'h4'>Contas Bancárias</Text>
        <Layout style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', top: -30, marginBottom: -30,  }}>
          {/* <List
            style = {{width: '100%', paddingVertical:0 , backgroundColor: '#F4FEFF'}}
            data={ data }
            renderItem={Transaction}
          /> */}
            {/* <BankAccounst route ='Notifications' title = 'Configurações' info = '123123-5' icon = 'settings-2-outline' navigation = {props.navigation}/> */}
            {/* <BankAccount route ='Notifications' title = 'Configurações' info = '123123-5' icon = 'settings-2-outline' navigation = {props.navigation}/>
            <BankAccount route ='Notifications' title = 'Configurações' info = '123123-5' icon = 'settings-2-outline' navigation = {props.navigation}/>
            <BankAccount route ='Notifications' title = 'Configurações' info = '123123-5' icon = 'settings-2-outline' navigation = {props.navigation}/>
            <BankAccount route ='Notifications' title = 'Configurações' info = '123123-5' icon = 'settings-2-outline' navigation = {props.navigation}/> */}
             <List
                style={styles.container}
                data={data}
                // ItemSeparatorComponent={Divider}
                renderItem={renderItem}
              />
        </Layout>
        
      </Layout>
      <Layout style = {styles.buttonCase}>
          <Button appearance='outline' status = 'info' onPress={() =>  console.log('Adicionar')}>Deslogar</Button>
        </Layout>
    </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'transparent',
    width: '100%'
  },  
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
 
    padding: 16, 
    margin: 16,
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -80,
    marginBottom: -50,
    alignItems: 'center',
 
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
    height: 400,
  },
  buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  jumboImage:{
    height: 220,
    width: 100,
    top: -35,
  },
  buttonCase:{
    position: 'absolute',
    bottom: 128,
    width: '100%',
    padding: 4,
    paddingHorizontal: 48,
  },
});
