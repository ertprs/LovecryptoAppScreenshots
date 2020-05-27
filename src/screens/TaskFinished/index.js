import React from "react";
import api from '../../api';
import * as firebase from "firebase";
import { getData } from '../../memoryAccess/getData';  
import { saveData } from '../../memoryAccess/saveData';  
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Button, Text } from '@ui-kitten/components';
import { StyleSheet, Image, ImageBackground} from "react-native";

const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    return res
  })
  return await token
}

sendTaskApi = async (id, answers) => {
  token = await getToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  data =  {'task_id': id, 'answers': answers}
  // console.log(config)
  // console.log(data)

  try{
    await api.post('/tasks/response',
    data, config).then( response => {
      console.log(response.data)
  });
  }catch ( error ) {
    console.log(error.message)
  }
}



export class TaskFinishedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.navigation.state.params.answers,
      id: this.props.navigation.state.params.id,
      points: this.props.navigation.state.params.points,
      urlImage: this.props.navigation.state.params.urlImage,
    };
  }



  // const [answers, setAnswers] = useState(props.navigation.state.params.answers)
  // const [id, setId] = useState(props.navigation.state.params.id)
  // const [points, setPoints] = useState(props.navigation.state.params.points)

  // console.log("asddasd  "+answers)


  goHome =  () =>{
    this.props.navigation.navigate('Home')
  }

  async componentDidMount(){
    user = await getData('@userData')
    user.points += this.state.points;
    // console.log(user)
    saveData('@userData', user)

    // console.log(this.state)

    sendTaskApi(this.state.id, this.state.answers).then(response => {
      console.log(response)
    })
  }

  // useEffect(async () => {
  //   // this.sendTaskApi(id, answers).then(res => {
  //   //   console.log(res.data)
  //   // })
  //   user = await getData('@userData')
  //   user.points += points;
  //   console.log(user)
  //   saveData('@userData', user)
    
  //   // getData('@user').then(user => {
  //   //   this.setState({
  //   //     user: user
  //   //   })
  //   //   user.points += points;
  //   //   saveUser(user)
  //   // })
  // })

  render(){

  
    return (
      <ScrollView>
        <ImageBackground blurRadius={3} source={{ uri: this.state.urlImage }} style={styles.background}>
          <Layout  style={styles.overlay}>
            <Text category='h3' style = {{textAlign: 'center', marginTop: 32}}  status='control'>Obrigado por</Text>
            <Text category='h3' style = {{textAlign: 'center'}}  status='control'>suas respostas!!</Text>
            <Image source={require('../../assets/images/awnsered.png')} style={styles.noMoreTasks}></Image>
            <Text category='h6' status = 'control' style = {{ marginTop: 48}}>Total ganho:</Text>
            <Layout style = {{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row'}}>
              <Text category='h1' status = 'control' >{this.state.points}</Text>
              <Text category='h6' status = 'control' style = {{ marginTop: 16}} > pontos</Text>  
            </Layout>
            <Layout style = {styles.buttonRow}>
              <Button onPress = { () => this.goHome()} appearance = 'outline' status = 'control'>Continuar</Button>
            </Layout> 
          </Layout>
          
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({  
  noMoreTasks: {
    marginTop: 20,
    width: 144,
    height: 204,
    // resizeMode: 'cover'
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
    // paddingTop: 70,
    // paddingBottom: 40,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});