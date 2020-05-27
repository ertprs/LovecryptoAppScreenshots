import React, {useState, useEffect} from "react";
import {
  Layout,
  Button,
  Text,
  Modal,
  Card,
  Icon
} from '@ui-kitten/components';
import { StyleSheet } from "react-native";
import { getData } from '../../memoryAccess/getData';
import { ScrollView } from "react-native-gesture-handler";
import { ImageBackground, Image, Share, Clipboard, ToastAndroid } from 'react-native'

const onShare = async () => {
  try {
    await Share.share({
      title: 'React Native Share',
      message:
        'Entre para comunidade Lovecrypto e ganhe recompensas por desempenhar atividades no seu celular. Faça uma grana extra ao se cadastrar com o código XXXXXX, você já ganha 0.05 cUSD. Acesse https://www.lovecrypto.net/#available-app',
    });
  } catch (error) {
    console.log(error.message);
  }
};
 
export const ShareAppScreen = (props) => {

// export class ShareAppScreen extends React.Component {
  // constructor(props) {
  //   super(props);
    // this.state = {
      // recommendation_code: '',
      // balance: 0,
      // points: 0,
  //   };
  // }

  // const [retrieve, setRetrieve] = useState(false);
  const [recommendation_code, setRecomendation_code] = useState(' ');
  const [balance, setBalance] = useState(0);
  const [points , setPoints] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const CopyToClipboard = () => {
    Clipboard.setString( recommendation_code)
    ToastAndroid.showWithGravityAndOffset(
      'Seu código de indicação foi copiado para área de transferencia',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      100,
    );
    return null;
  };

  // async componentDidMount(){
  //   user = await getData('@userData')
  //     console.log('teste ' +  JSON.stringify(user) )
  //   this.setState({ 
  //     recommendation_code: user.recommendation_code,
  //     balance: user.balance,
  //     points: user.points,
  //   })
  // }
  const Header = (props) => (
    <Layout {...props}>
      <ImageBackground source={require('../../assets/images/share-card-header.jpg')} style={styles.cardBackgroundImg}></ImageBackground>
    </Layout>
  );
  
  // const retrieve = async(){}

  useEffect(() => {
    // const retrieveData = async () => {
    //   try {
    //     const valueString = await AsyncStorage.getItem('user');
    //     const value = JSON.parse(valueString);
    //     // Other set states
    //     setData(value);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    getData('@userData').then(data => {
      setRecomendation_code(data.recommendation_code)
      setBalance(data.balance)
      setPoints(data.points)
    })
    // setRecomendation_code(data.recommendation_code)
    // console.log(data)
  }, [])


// render(){
  return(
    <ScrollView>
       <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style = {{maxHeight: 600,}} header={Header}>
          <ScrollView>
            <Layout style = {{flex: 1, paddingTop: 8,   width: '70%'}}>
              <Layout style = {styles.listItem}>
              <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Text category = 'h6' status = 'control' >1</Text>
              </Layout>
                <Text style = {{marginTop: 4}}>Compartilhe seu código</Text>
              </Layout>
              <Layout style = {styles.listItem}>
              <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Text category = 'h6' status = 'control' >2</Text>
              </Layout>
                <Text>Seu amigo adiciona o seu código no momento do cadastro no app</Text>
              </Layout>
              <Layout style = {styles.listItem}>
              <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Text category = 'h6' status = 'control' >3</Text>
              </Layout>
                <Text>Ele e você recebem um bonus por usar o código de indicação</Text>
              </Layout>
              <Layout style = {styles.listItem}>
              <Layout style = {{marginRight: 16, height: 30, width: 30, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Text category = 'h6' status = 'control' >4</Text>
              </Layout>
                <Text>Indique quantos amigos quiser!</Text>
              </Layout>
            </Layout>  
            <Text style = {{marginTop: 48}}>
              Bonus por indicação:
            </Text>
            <Layout style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
              <Text category = 's1'>Você</Text>
              <Text category = 's1' status = 'success'>50 pontos</Text>
            </Layout>
            <Layout style = {{display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <Text category = 's1'>Indicado</Text>
              <Text category = 's1' status = 'success'>50 pontos</Text>
            </Layout>
            <Button status = 'success' style = {{margin: 4, marginTop: 48,}} onPress={()=> onShare()}>compartilhar</Button>
          <Layout>
          </Layout>
          </ScrollView>        
        </Card>
      </Modal>
      <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
        <Image source={require('../../assets/images/share.png')} style={styles.jumboImage}></Image>  
      </ImageBackground>
      <Layout style = {{ top: -110, marginBottom: -110, backgroundColor: 'transparent'}}>
        <Text  style = {{marginLeft: 16,}} status  = 'control' category = 'h4'>Indique e ganhe</Text>
        <Layout style = { styles.card}>
          <Layout style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center',    }}>
            <Text style = {{textAlign: 'center'}}>Ganhe 10 Pontos E Seu Amigo Até 10 Pontos Ao Indicar O Lovecrypto</Text>
            <Button style = {{borderRadius: 32, marginTop: 32, borderStyle: 'dashed'}} status = 'success'  appearance = 'outline'  onPress={() =>  CopyToClipboard()}>Seu código é : { recommendation_code} </Button>
            <Layout style={{marginTop: 32}}>
              <Button status = 'success' style = {{margin: 4}} onPress={()=> onShare()}>compartilhar</Button>
              <Button status = 'primary'  appearance = 'ghost' style = {{margin: 4}} onPress = {()=> setVisible(true)}>Saiba Mais</Button>
            </Layout>
          </Layout>
        </Layout>
        <Layout style = { styles.card}>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Text category='label'>Você já ganhou</Text>
            <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Text category='h5' style={{marginTop: 8}}>{ balance.toFixed(2)}</Text>
              <Text category='c1' style={{marginTop: 16}}> cUSD</Text>
            </Layout>
          </Layout>
          <Layout style={{borderWidth: 0.2, borderColor: '#ddd', height: 60}}/>
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Text category='label'>pontos</Text>
            <Text category='h5' style={{marginTop: 8}}> { points}</Text>
          </Layout>
        </Layout>
      </Layout>
    </ScrollView>
    );
  // }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    padding: 32, 
    margin: 16,
    borderRadius: 10, 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listItem:{
    display: 'flex', 
    flexDirection: 'row',
    marginTop: 8 
  },  
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    height: 400,
  },
  cardBackgroundImg:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 120,
  },
  buttonRow:{
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  jumboImage:{
    height: 200,
    width: 192,
    top: -35,
  },
});
