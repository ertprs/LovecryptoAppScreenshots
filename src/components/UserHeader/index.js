import React from 'react';
import { 
  Image, 
  StyleSheet,
  ScrollView,
  ImageBackground, 
  } from 'react-native'
import {
    Layout,
    Text,
  } from '@ui-kitten/components';
import {  withNavigation} from "react-navigation";
import { getData } from '../../memoryAccess/getData';
import {ProfileOption} from '../../components/ProfileOption';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'userName',
      id: 0
    };
  }

  async componentDidMount(){
    user = await getData('@userData')
    this.setState({ 
      name: user.name,
      id: ("000000" + user.id).slice(-7),
    })
  
  }
  
  link = async () => {
    this.props.navigation.navigate("Detail");
  };
  
  render() {
    return (
      <ScrollView>
        <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}/>
        <Layout style = { styles.card}>
          <Layout style = {{ width: '100%', backgroundColor: 'transparent', marginTop: 8, alignItems: 'center', top: -70, marginBottom: -70}}>
            <Image style = {{height: 100, width: 100, borderRadius: 50}} source={require('../../assets/images/avatar.png')} ></Image>
            <Text style = {styles.text} category='h5'>{this.state.name}</Text>
            <Text style = {{marginBottom: 40}} category='p1'appearance='hint'>ID {this.state.id}</Text>
            <ProfileOption route ='Detail' title = 'Editar Perfil' icon = 'edit-outline' navigation = {this.props.navigation}/>
            <ProfileOption route ='Notifications' title = 'Configurações' icon = 'settings-2-outline' navigation = {this.props.navigation}/>
            <ProfileOption route ='AssociedAccounts' title = 'Contas Associadas' icon = 'credit-card-outline' navigation = {this.props.navigation}/>
            <ProfileOption route ='ShareApp' title = 'Indique e Ganhe' icon = 'share-outline' navigation = {this.props.navigation}/>
            <ProfileOption route ='Legal' title = 'Legal' icon = 'file-text-outline' navigation = {this.props.navigation}/>   
            <ProfileOption route ='Suport' title = 'Ajuda' icon = 'question-mark-circle-outline' navigation = {this.props.navigation}/>
          </Layout>
        </Layout>
      </ScrollView>
    );
  }
}
 
export const UserHeader = withNavigation(Header)

const styles = StyleSheet.create({ 
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    paddingHorizontal: 32, 
    padding: 32, 
    margin: 16,
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -130,
    alignItems: 'center',
    maxHeight: 600,
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
   buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
});