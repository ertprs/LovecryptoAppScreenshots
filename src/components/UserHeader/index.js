import React from 'react';
import { StyleSheet, ImageBackground , AsyncStorage} from 'react-native'
import { SafeAreaView, withNavigation} from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import {
    Layout,
    Avatar,
    Text,
    Button,
    Card
  } from 'react-native-ui-kitten';
  


const getUser = async () => {
  let usuario = null;
  try {
    usuario = await AsyncStorage.getItem('user') || 'none';
  } catch (error) {
    console.log(error.message);
  } 
  // console.log(usuario + 'recuperado da memoria')
  return JSON.parse(usuario)
}




class Header extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'Lucas',
      id: 0
    };
  }

  componentDidMount(){
    
    

    getUser().then(data => {
      
      this.setState({ 
        name: data.name,
        id: ("000000" + data.id).slice(-7),
      })
    });    
  }
  

  
  link = async () => {
    this.props.navigation.navigate("Detail");
  };
  
  

  render() {
    return (
      <Layout style = {styles.container}>
        <Layout style = {styles.card}>  
          <Layout style = {{width: 70, height: 70, borderRadius: 35, backgroundColor: '#B853FB', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
            <Layout style = {{width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
              <Avatar
              size='giant'
              source={ require('../../../assets/images/avatar.png')}
            />
            </Layout>             
          </Layout>
          <Layout style = {{ marginTop: 8, alignItems: 'center'}}>
            <Text style = {styles.text}category='h6' >{this.state.name}</Text>
            <Text style = {styles.text}appearance='hint' category='p1'>ID {this.state.id}</Text>
          </Layout>
          <Layout style = {styles.actionButton}>
             <Button  disabled = {true} style={styles.button} appearance='ghost' onPress={() => this.link()} >Mais Detalhes</Button>
           </Layout>
        </Layout>
      </Layout>  
    );
  }
}


// <Avatar
//             size='giant'
//             source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
//           />
//           <Text style = {styles.text}category='h6' >{this.state.name}</Text>
//           <Text style = {styles.text}appearance='hint' category='p1'>ID {this.state.id}</Text>
//           <Button style={styles.button} appearance='ghost' onPress={() => this.link()} >Mais Detalhes</Button>
//           {/* <Layout style = {styles.actionButton}>
//             <Button style={styles.button} appearance='ghost' onPress={() => this.link()} >Mais Detalhes</Button>
//           </Layout> */}

export const UserHeader = withNavigation(Header)

const styles = StyleSheet.create({ 
  text:{
    paddingTop: 4
  },
  card: {
    paddingTop: 24,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    marginTop: 26,
    // borderWidth: 2,
    // borderColor: 'black',
    // borderRadius:10,
  },
  actionButton:{
    borderColor: '#ddd',
    borderTopWidth:1,
    width: '100%',
    marginTop: 20,
  },
  backgroundImg:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 290,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#7A05C8',
  },
  // cardContent:{
  //   flex: 1,
  //   alignItems: 'center',
  // },
});