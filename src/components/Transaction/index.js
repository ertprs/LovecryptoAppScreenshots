import { StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Avatar
  } from '@ui-kitten/components';
import React from "react";

export const Transaction = ({ item, user}) => {
  return (
    <Layout style = {{ display: 'flex', flexDirection: 'row', width: '100%', padding: 8, justifyContent: "space-between"}}>
      <Layout style = {{ display: 'flex', flexDirection: 'row'}}>
        <Avatar style={{marginTop: 12}}  shape='rounded' size='Large' source={{uri: 'https://picsum.photos/200'}}/>
        { item.type == 'fiat' &&         <Layout style = {{paddingLeft: 16}}>
            <Text  category='s1'>{item.name}</Text>
            <Text appearance = 'hint' category='p2'>{item.account}</Text>
            <Text appearance = 'hint' category='p2'>{item.agency}</Text>
        </Layout>
        }
        { item.type == 'crypto' &&         
        <Layout style = {{paddingLeft: 16}}>
            <Text  category='s1'>{item.name}</Text>
            <Text appearance = 'hint' category='p2'>{item.hash}   </Text>
       
        </Layout>
        }
      </Layout>        
      <Layout style = { { alignItems: 'flex-end'}}>
        <Layout style = {{display: 'flex', flexDirection: 'row'}}>
          <Text category='s1'>132654</Text>
          <Text style = {{marginTop: 4, marginLeft: 8}} category='c1'>{item.currency}</Text>
        </Layout>
          <Text style = {styles.text} appearance = 'hint' category='p2'>{item.date}</Text>
      </Layout>     
    </Layout>
  )}


const styles = StyleSheet.create({
    card: {
      shadowColor: "#000", 
      shadowOffset: {	width: 0,	height: 7,},
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14, 
      padding: 32, 
      margin: 16,
      borderRadius: 10, 
      justifyContent: 'space-around',
      top: -130,
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
      height: 200,
    },
    buttonRow:{
      paddingBottom: 16,
      backgroundColor: 'transparent',
    }
  });
  