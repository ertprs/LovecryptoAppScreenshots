import React, { Component } from "react";
import { StyleSheet, Image, AsyncStorage} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Button} from 'react-native-ui-kitten'
import { generalStyle } from '../../shared/generalStyle';
import { api } from '../../config/api'
import * as firebase from "firebase";

const clear = async () => {
  await deleteUserApi();
  await deleteUserFirebase();
  await firebase.auth().signOut();
  console.log('deleted account and data  ')
  return this.props.navigation.navigate("Welcomecreen");
};

const getUser = async () => {
  try {
    usuario = await AsyncStorage.getItem('user') || 'none';
  } catch (error) {
    console.log(error.message);
  } 
  return JSON.parse(usuario)
}

const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    return res
  })
  return await token
}

const deleteUserApi = async () => {
  user = await getUser();
  token = await getToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
    await api.delete('/user/delete/' + user.id,{
    } , config).then( response => {
     console.log(response.data);
     console.log('usuario deletado da api')
  });
  }catch ( error ) {
    console.log(error.message)
  }
}

const deleteUserFirebase = async () => {
  var user = firebase.auth().currentUser;
  // console.log(JSON.stringify(user))
  user.delete().then(function() {
    console.log('usuario deletado do firebase')
  }).catch(function(error) {
    console.log(error.menssage)
  });

}




export class MyDataScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uid: 0,
      id: 0
    };
  }

  
  render() {
    return (
      <ScrollView>
        <Layout style = {generalStyle.container}>
          <Image style={generalStyle.topImageIcon} source={require('../../../assets/images/data_icon.png')} />
          <Text style = {generalStyle.paragraph}>Ao clicar neste botão, todos os dados sobre você em nossos servidores serão excluídos e sua conta encerrada</Text>
          <Layout style = {styles.buttonCase}>
            <Button style = {styles.button} status='info' appearance='outline' onPress={() => clear()}>Apague meus dados</Button>
          </Layout>
        </Layout>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonCase:{
    marginTop: 192,
    width: '100%',
    padding: 4,
    paddingHorizontal: 72,
  },
});
