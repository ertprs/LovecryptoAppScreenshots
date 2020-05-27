import React from "react";
 
import {
  Layout,
  List,
  ListItem,
  Text,
  Avatar
} from '@ui-kitten/components';
import { ImageBackground, StyleSheet, Image} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { RankingPerson} from '../../components/RankingPerson';

const data =  [
  { position: 1, image: 'https://picsum.photos/200', name: 'Tony Stark', location: 'Nova York', points: 9999},
  { position: 2, image: 'https://picsum.photos/200', name: 'Thor Odinson', location: 'Asgard', points: 9949},
  { position: 3, image: 'https://picsum.photos/200', name: 'Natasha Romanoff', location: 'Moscou', points: 9899},
  { position: 4, image: 'https://picsum.photos/200', name: 'Steve Rogers', location: 'Nova York', points: 9713},
 ]

 const RenderItem = ({ item, user }) => (
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
);
 

export const RankingScreen = (props) => {

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
        <Image source={require('../../assets/images/Ranking.png')} style={styles.jumboImage}></Image>
      </ImageBackground>
        

      <Layout style = { styles.card}>
      <Text  style = {{top: -60, left: -140}} status  = 'control' category = 'h4'>Ranking</Text>
        <Layout style = {{ width: '100%', backgroundColor: 'transparent',  alignItems: 'center', top: -30, marginBottom: -30,   }}>
          <RenderItem user = {true} item =  { {position: 1, image: 'https://picsum.photos/200', name: 'Tony Stark', location: 'Nova York', points: 9999}}/>
          <List
            style = {{width: '100%', paddingVertical:0, backgroundColor: '#F4FEFF'}}
            data={ data }
            renderItem={RankingPerson}
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
  jumboImage:{
    height: 220,
    width: 100,
    top: -35,
  },
  buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  }
});
