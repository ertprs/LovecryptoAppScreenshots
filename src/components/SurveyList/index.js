
import React from 'react';
import {
  Layout,
  Text,
  List,
  Button,
  } from 'react-native-ui-kitten';
import * as firebase from "firebase";


import { Ionicons } from "@expo/vector-icons";
import { NoRegister } from '../../components/NoRegister';
import { StyleSheet, TouchableNativeFeedback, ImageBackground, Image } from 'react-native';
import api from '../../config/api'

const ArrowIcon = () => (
  <Ionicons name= {'md-arrow-round-forward'} size={20} color="#fff" />
); 


const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    // console.log(res)
    return res
  })
  return await token
}

// const getTasks = async () => {
//   token = await getToken();
//   console.log('get tasks')
//   config = {
//     headers: { Authorization: `Bearer ${token}` }
//   }
//   console.log(token)
//   try{
//       await api.get('/tasks', config).then( response => { 
//         console.log(JSON.stringify(response))
//         return JSON.parse(response)
//     });
//   }catch ( error ) {
//     console.log(error.message)
//   }
// }


const getTasks = async () => {
  // console.log('carregando tasks')
  tasks = null;

  token = await getToken()

  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  // console.log(token)

  try{
    await api.get('/tasks', config).then( response => {
    //  console.log(response.data);
     tasks = response.data
  });
  }catch ( error ) {
    console.log(error.message)
  }
  // console.log(tasks)
  return tasks
}


export class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      tasks: []      
    };
  }


  async componentDidMount(){
    // console.log('carregou')
    
    getTasks().then(data => {
      this.setState({ 
        tasks: data
      })
    })
  
 }

  openTask = async (id) => {
    this.state.navigation.navigate('Task', {id:id});
    // console.log('task ' + id)
  };
  
  renderItem = ({ item, index }) => (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }} style={styles.image}>
      <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#9843D0')}  onPress={() => this.openTask(item.id)}>
        <Layout style = {styles.overlay}>
            <Text
              category='s1'
              status='success'>
              {Number(item.points)} pontos
            </Text>
          <Text
            category= {item.name.length < 20 ? 'h3' : 'h4'}
            status='control'>
            {item.name}
          </Text>
          <Text
            style={styles.durationButton}
            category='s1'
            status='warning'>
            {item.qtd_questions} perguntas
          </Text>
          <Button
            style={styles.arrowButton}
            size='small'
            appearance='ghost'
            icon={ArrowIcon}>
          </Button>
        </Layout>
      </TouchableNativeFeedback>
    </ImageBackground>
  );
  
  render(){  
    return (
      <Layout>
        <List
          style = {{paddingVertical:8, backgroundColor: '#F4FEFF'}}
          data={ this.state.tasks }
          renderItem={this.renderItem}
        />
        { this.state.tasks.length == 0 &&
          <NoRegister type = 'Tarefas'></NoRegister>
        }
      </Layout>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '100%',
  },
  image: {
    minHeight: 200,
    borderRadius: 4,
    overflow: 'hidden',
    margin:8,
    marginHorizontal: 16,
  },
  durationButton: {
    position: 'absolute',
    paddingTop: 10,
    left: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
  arrowButton: {
    position: 'absolute',
    paddingTop: 10,
    right: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
  backgroundImg:{
    width: '100%',
  },
  overlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});