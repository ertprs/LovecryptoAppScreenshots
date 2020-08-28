//Importações Externas
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Button, Text } from '@ui-kitten/components';
import { StyleSheet, Image, ImageBackground} from "react-native";
 
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
      console.log('RESPOSTA ' + JSON.stringify(response))
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
    <ScrollView style = {{ flex: 1, backgroundColor: '#9807F9' }}>
      <ImageBackground blurRadius={5} source={{ uri: urlImage }} style={ styles.background }>
        <Layout style = { styles.overlay  }>
          <Text category = 'h4' style = {{ textAlign: 'center', marginTop: 32 }}  status = 'control'>Obrigado por</Text>
          <Text category = 'h4' style = {{ textAlign: 'center' }}  status = 'control'>suas respostas!!</Text>
          <Image source = {require('../assets/images/awnsered.png')} style = { styles.noMoreTasks }/>
          <Text category = 'h6' status = 'control' style = {{ marginTop: 48}}>Total ganho:</Text>
          <Layout style = {{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>
            <Text category = 'h1' status = 'success' >{ points == 0 ? parseFloat( reward / multiplier).toFixed(2) : points }</Text>
            <Text category = 'h6' status = 'success' style = {{ marginTop: 16}} > { points == 0 ? ' cUSD' : ' pontos' }</Text>  
          </Layout> 
          <Layout style = { styles.buttonRow }>
            <Button onPress = { () => goHome() } appearance = 'outline' status = 'control'>Continuar</Button>
          </Layout> 
        </Layout>
      </ImageBackground>
    </ScrollView>
  );
}


const styles = StyleSheet.create({  
  noMoreTasks: {
    marginTop: 20,
    width: 126,
    height: 180,
  },
  background: {
    flex: 1,
    minHeight: 650,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 32,
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});