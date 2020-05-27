import React from 'react';
import {
  Layout,
  Text,
  List,
  Button,
  } from '@ui-kitten/components';
  import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from '../../components/Loading';
import { NoRegister } from '../../components/NoRegister';
import { StyleSheet, TouchableNativeFeedback, ImageBackground} from 'react-native';

import api from '../../api'

const ArrowIcon = () => (
  <Ionicons name= {'md-arrow-round-forward'} size={20} color="#fff" />
); 

const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    return res
  })
  return await token
}

const getTasks = async () => {
  tasks = null;
  token = await getToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  // console.log('Config ' + config)
  try{
    await api.get('/tasks', config).then( response => {
      tasks = response.data
      
      
    });
    }catch ( error ) {
      console.log(error.message)
    }
    return tasks
}
 
export class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      tasks: [],
      loading: true, 
    };
  }

  async componentDidMount(){
    await getTasks().then(response => {
      this.setState({ 
        tasks: response,
        loading: false,
      })
      console.log('Tarefas ' + this.state.tasks.length)
    })
  } 


  async componentDidUpdate(){
    if(this.state.tasks.length = 0){

    }
  } 

  openTask = async (id) => {
    this.state.navigation.navigate('Task', {id:id});
  };
  
  renderItem = ({ item, index }) => (
    <ImageBackground source={{ uri: item.campaign.cover }} style={styles.image}>
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
          style = {{paddingVertical:0, backgroundColor: '#F4FEFF'}}
          data={ this.state.tasks }
          renderItem={this.renderItem}
        />
        { this.state.loading &&
          <Loading/>
        }
        { ( this.state.tasks.length == 0)  && !this.state.loading &&
          <NoRegister type = 'tasks'/>
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
  overlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(98,4,160,0.3)',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});