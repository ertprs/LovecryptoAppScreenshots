import React from 'react';
import { StyleSheet, ToastAndroid, ImageBackground} from 'react-native';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';




const styles = StyleSheet.create({
    header: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingVertical: 24,
      paddingHorizontal: 24,
      width: '100%',
      justifyContent: 'center',
      backgroundColor: '#7A05C8',
      textAlign: 'center',  
    },
    text:{
      color: 'white',
      alignSelf:'center'
    },
    value:{
      paddingVertical: 8,
      color: 'white',
    },
    info:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      color: '#7A05C8',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: 'transparent',
    },
    buttonCase:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: 24,
      paddingHorizontal: 32,
    },
    top:{
      backgroundColor: 'transparent',
      height: 150,
      width: '100%',
      justifyContent: 'center',
    },
    topInfo:{
      backgroundColor: 'transparent',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      textAlignVertical: 'center'
    },  
    bottom:{
      backgroundColor: '#f11fff',
      height: 150,
      width: '100%'
    },
    image:{
      width: 200,
      height: undefined,
      aspectRatio: 100 / 300,
      flex: 1,
      resizeMode: 'stretch',
    },
    backgroundImg:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 150,
    },
    buttonRow:{
      paddingBottom: 16,
      backgroundColor: 'transparent',
    },
    container:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      color: '#7A05C8',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: 'transparent',
    }
});


export class HeaderHistory extends React.Component {

  constructor(props) {
      super(props)
      this.state = { 
        hidden: false,
        totalTasks: 0,
        totalEarned: 0,
        currency: 'U$',
      }
  }

  render() {
  
    return (
      <Layout level = '3'>
        <ImageBackground source={require('../../../assets/images/reward_bg.png')} style={styles.backgroundImg}>
            <Layout style = {styles.container}>
              <Layout style = {styles.info}>
                <Layout style = {styles.topInfo}>
                    <Text category='s1' style = {styles.text}>Total Ganho</Text>
                </Layout>
                <Text category='h1' style = {styles.value}>{this.state.currency} {this.state.totalEarned.toFixed(2)}</Text>
              </Layout>
              <Layout style = {styles.info}>
                <Layout style = {styles.topInfo}>
                      <Text category='s1' style = {styles.text}>Numero de tarefas</Text>
                  </Layout>
                  <Text category='h1' style = {styles.value}> {this.state.totalTasks}</Text>
              </Layout>  
            </Layout>
        </ImageBackground>
      </Layout>
    );
  }
}