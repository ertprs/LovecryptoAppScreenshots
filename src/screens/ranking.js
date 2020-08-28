import React from "react";
import { TouchableNativeFeedback, Image, StyleSheet } from "react-native";
import { Layout, Icon, Text, useTheme , Avatar, List} from '@ui-kitten/components'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import {ThemeContext} from '../../theme-context'; 
import { TopNavigationHeader } from '../shared/topNavigation'
 


const data =  [
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
    { name: 'Bradesco', location: 'fiat',  points: '2'},
   ]
  





export const RankingScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme();


    RenderItem = ({ item, index }) => (
        <Layout style = {{width: '100%', padding: 16, borderRadius: 10, flex: 1, backgroundColor: theme['color-primary-600'] }}>
            <Text status='control' category = 's1'>Sua posição</Text>
            <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent'}}>
                <Layout style = {{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
                    <Text status='control' category = 'p1'>99</Text>
                    <Avatar style={{margin: 12}}  size='large'  shape='round' source={require('../assets/images/icon.png')}/>
                    <Layout style = {{ backgroundColor: 'transparent'}} >
                        <Text status='control' category = 's1'>Lucas Zacarias</Text>
                        <Text status='control' category = 'p1'>Recife</Text>
                    </Layout>
                </Layout>
                <Layout  style = {{flexDirection: 'row', justifySelf: 'right',  backgroundColor: 'transparent'}}>
                    <Text status='control' category = 's1'>9999</Text>
                    <Text status='control' category = 'p1'> pontos</Text>
                </Layout>
                
            </Layout>
        </Layout>
   );
    

   const PositionItem = ({ item, index }) => (
         <Layout style={{width: '100%', padding: 4,   flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
                
                <Text category = 'p1'>{index + 1}</Text>   
                 
                <Avatar style={{margin: 12}}  size='large'  shape='round' source={require('../assets/images/icon.png')}/>
                <Layout style = {{ backgroundColor: 'transparent'}} >
                    <Text category = 's1'>{item.name}</Text>
                    <Text category = 'p1'>{item.location}</Text>
                </Layout>
            </Layout>
            <Layout  style = {{flexDirection: 'row', }}>
                <Text category = 's1'>{item.points}</Text>
                <Text category = 'p1'> pontos</Text>
            </Layout>
            
        </Layout>
   
);

    return (
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
            <TopNavigationHeader navigation = {props.navigation}  title = 'Ranking'/>
            <ScrollView>
                <Layout style = {{width: '100%', height: 200, alignItems: 'center', paddingTop: 24,backgroundColor: theme['color-primary-default']}}>
                    {/* <Image style = {{height: 30, width: 165}} source={require('../assets/images/logo_white.png')} ></Image> */}
                </Layout>
                <Layout style = {{ top: -140, marginBottom: -140, backgroundColor: 'transparent'}}>
                    <Layout style = { styles.card}>
                        <RenderItem/>
                        <List
                            style={{width: '100%', marginTop: 16}}
                            data={data}
                            renderItem={PositionItem}
                        />
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView>
   
    );
}


const styles = StyleSheet.create({
    card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    // flexDirection: 'row',
    padding: 16, 
    // paddingHorizontal: 64, 
    margin: 16,
    borderRadius: 10, 
    justifyContent: 'space-between',
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
  },
  shimmerComponent: {
    width: 60,
    height: 25,
    marginTop: 8,
  }
});
