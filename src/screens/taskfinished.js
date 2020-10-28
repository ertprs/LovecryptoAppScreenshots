//Importações Externas
// import Counter from 'react-native-counter';
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Button, Text } from '@ui-kitten/components';
import { StyleSheet, Image, ImageBackground, View} from "react-native";
 
//Importações Internas
import { sendTaskApi } from '../api/sendTaskApi';
import { addUserBalance, addUserPoints }from '../store/actions/user'
import { taskEvent } from '../shared/analyticsLog'
import { multiplier } from "../shared/constants";
 
export const TaskFinishedScreen =  (props) => { 

  const dispatch = useDispatch()
  const user = useSelector(state => state.userState);

  const [answers, setAnswers] = useState(props.route.params.answers)
  const [id, setId] = useState(props.route.params.id)
  const [ points, setPoints ] = useState(props.route.params.points)
  const [ reward, setReward ] = useState(props.route.params.reward)
  const [ urlImage, setUrlImage ] = useState(props.route.params.urlImage)
  
  const goHome = () =>{
    props.navigation.navigate('Home')
  }
 
  useEffect(() => {
    sendTaskApi(id, answers).then( response => {
      console.log('SUCCESS ' + response)
      //Logica de negócio
      if(points != 0){
        dispatch(addUserPoints(user.points + points))
      }else{
        dispatch(addUserBalance(user.balance + reward))
      }
    })
    taskEvent('taskFinished')
  }, []);
 
  return (
    // <ScrollView style = {{ flex: 1, backgroundColor: '#9807F9' }}>
      <ImageBackground blurRadius={5} source={ urlImage != null? require('../assets/images/awnsered.png') : { uri: urlImage }} style={ styles.background }>
        <Layout style = { styles.overlay}>
          <ScrollView style = {{flex: 1, width: '100%'}}>
          <Animatable.View animation="bounce"  style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', paddingBottom: 24 }}>
            <Text category = 'h4' style = {{ textAlign: 'center', }}  status = 'control'>Obrigado por</Text>
            <Text category = 'h4' style = {{ textAlign: 'center' }}  status = 'control'>suas respostas!!</Text>
            <Animatable.View animation="fadeInUp">
              <Image source = {require('../assets/images/awnsered.png')} style = { styles.noMoreTasks }/>
            </Animatable.View > 
          <Text category = 'h6' status = 'control'>Total ganho</Text>
          <Layout style = {{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>
            <Text category = 'h1' status = 'success' >{ points == 0 ? parseFloat( reward / multiplier).toFixed(2) : points }</Text>
            <Text category = 'h6' status = 'success' style = {{ marginTop: 16}} > { points == 0 ? ' cUSD' : ' pontos' }</Text>  
          </Layout> 
          <Layout style = { styles.buttonRow }>
            <Button onPress = { () => goHome() } appearance = 'outline' status = 'control'>Continuar</Button>
          </Layout>
          </Animatable.View > 
          </ScrollView>
        </Layout>  
      </ImageBackground>
    // </ScrollView>
  );
}


const styles = StyleSheet.create({  
  noMoreTasks: {
    marginVertical: 24,
    width: 126,
    height: 180,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // minHeight: 720,
    justifyContent: 'center',
    alignItems: 'center',
    
    resizeMode: 'stretch',
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent'
    },
  buttonRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    marginVertical: 48,
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'transparent'
    },
  overlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
});