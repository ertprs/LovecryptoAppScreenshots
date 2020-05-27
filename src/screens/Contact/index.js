import React from "react";
import { StyleSheet } from "react-native";
import { UserHeader } from '../../components/UserHeader';
import {
  Layout,
  Button,
  Text,
  Modal,
  Card,
  Icon
} from '@ui-kitten/components';
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { clearStorage } from '../../memoryAccess/clearStorage'
export const ContactScreen = (props) => {
  
  signout = async () => {
    setVisible(true)
    await firebase.auth().signOut();
    clearStorage()
    return props.navigation.navigate("WelcomeScreen");
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
            <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
            <Icon fill='white' style = {{height: 24, width: 24, alginSelf: 'right'}} name='log-out-outline'/>
            </Layout>
            <Text  style = {{marginTop: 8}} category = 'h6'>Logout</Text>
            <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>Tem certeza que deseja sair?</Text>
            <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
              <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                CANCELAR
              </Button>
              <Button style = {{margin: 12}} status = 'danger' onPress={() => signout()}>
                DESLOGAR
              </Button>
            </Layout>
          </Layout>          
        </Card>
      </Modal>
      <ScrollView>
        < UserHeader/>
        <Layout style = {styles.buttonCase}>
          <Button appearance='outline' status = 'info' onPress={() =>  setVisible(true)}>Deslogar</Button>
        </Layout>
        <Layout  style = {{marginVertical: 40, justifyContent: 'center', alignItems: 'center'}} >
          <Text category='s2'>Lovecrypto Inc</Text>
          <Text category='c1' appearance='hint'>Lovecrypto para Android - versão 1.1.3</Text>
        </Layout>
        </ScrollView>
      </Layout>
    );
  }

const styles = StyleSheet.create({
  buttonCase:{
    position: 'absolute',
    bottom: 128,
    width: '100%',
    padding: 4,
    paddingHorizontal: 48,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
