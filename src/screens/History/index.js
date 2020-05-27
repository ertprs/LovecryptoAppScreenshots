import React from "react";
import { StyleSheet } from "react-native";
import { UserHeader } from '../../components/UserHeader';
import {
  Layout,
  Button,
  Text,
  Modal,
  Card,
  Icon,
  List
} from '@ui-kitten/components';
import { ImageBackground, Image} from 'react-native'
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { clearStorage } from '../../memoryAccess/clearStorage'
import { Transaction } from '../../components/Transaction'

const data =  [
  { name: 'Bradesco', type: 'fiat',  hash: '', account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'fiat', hash: '',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'crypto', hash: '0x5 ... 6f5eb8ba1b7eb',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
  { name: 'Bradesco', type: 'fiat', hash: '',account: '123123-5', agency: '1231-4', image: 'https://picsum.photos/200', date: '12/03/2020', value: 1231, currency: 'BRL'},
 ]

export const HistoryScreen = (props) => {
  
  // signout = async () => {
  //   setVisible(true)
  //   await firebase.auth().signOut();
  //   clearStorage()
  //   return props.navigation.navigate("WelcomeScreen");
  // };

  // const [visible, setVisible] = React.useState(false);

  return (
    // <Layout>
      
   
    //     {/* <UserHeader/> */}
    //     <Text>History</Text>
    //     <Text>History</Text>
    //     <Layout  style = {{marginVertical: 40, justifyContent: 'center', alignItems: 'center'}} >
    //       <Text category='s2'>Lovecrypto Inc</Text>
    //       <Text category='c1' appearance='hint'>Lovecrypto para Android - versão 1.1.3</Text>
    //     </Layout>
    
    //   </Layout>
    <ScrollView>
       <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
        <Image source={require('../../assets/images/Ranking.png')} style={styles.jumboImage}></Image>
        
      </ImageBackground>
      <Layout style = { styles.card}>
        <Text  style = {{top: -60, left: -70}} status  = 'control' category = 'h4'>Histórico de Saques</Text>
        <Layout style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', top: -30, marginBottom: -30,  }}>
          <List
            style = {{width: '100%', paddingVertical:0 , backgroundColor: '#F4FEFF'}}
            data={ data }
            renderItem={Transaction}
          />
        </Layout>
      </Layout>
    </ScrollView>
    );
  }

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    // paddingHorizontal: 32, 
    padding: 16, 
    margin: 16,
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -80,
    marginBottom: -50,
    alignItems: 'center',
    // maxHeight: 600,
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
});
