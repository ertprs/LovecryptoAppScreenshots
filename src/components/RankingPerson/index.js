import React from "react";
import {
    Layout,
    Text,
    Avatar,
  } from '@ui-kitten/components';
  import { StyleSheet } from "react-native";

export const RankingPerson = ({ item, user}) => { 
  // const user = props.user
  // console.log(props)
  return (
    
    <Layout style = {{ backgroundColor:  user ? '#A089FE' : 'white', width: '100%', marginBottom: user? 16 : 0, paddingVertical: user? 16 : 8, paddingHorizontal: 16,  borderRadius: 10, }}>
      { user && 
        <Text category='s1' status = { user ? 'control': 'basic'} style = {{marginBottom: 16}}>
          Your Rank
        </Text>
      }
      <Layout style = {{display: 'flex', flexDirection: 'row' , justifyContent: "space-between", backgroundColor: 'transparent' }}>
        <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
          <Text category='h6'  status = { user? 'control': 'basic'} style = {{marginTop:8}}>{item.position}</Text>
          <Avatar style={{marginLeft: 16}} size='medium' source={{uri: 'https://picsum.photos/200'}}/>
          <Layout style = {{paddingLeft: 16, backgroundColor: 'transparent'}}>
            <Text category='s1' status = { user? 'control': 'basic'}>{ item.name }</Text>
            <Text appearance= 'hint' status = { user? 'control': 'basic'} category='p2'>{item.location}</Text>
          </Layout>
        </Layout>
        <Layout style = {{display: 'flex', flexDirection: 'row', marginTop: 8, backgroundColor: 'transparent'}}>
          <Text category='s1' status = { user? 'control': 'basic'}>132654</Text>
          <Text category='c1' status = { user? 'control': 'basic'} style = {{marginTop: 4, marginLeft: 8}}>pontos</Text>
        </Layout>    
      </Layout>
    </Layout>
  )}


    
const styles = StyleSheet.create({
  backgroundImg:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 200,
  },
});
  