import React from 'react';
import { StyleSheet, SafeAreaView, Image} from 'react-native'
import { Text, Layout, Button, useTheme} from '@ui-kitten/components'

import { RecoverPassword } from '../components/recoverpassword';
import { LovecryptoLogo } from '../components/lovecryptoLogo'

export const ForgotPasswordScreen = ({ navigation}) => {
  
  const theme = useTheme();
  
  const goToLogin = async () => {
    navigation.navigate('Login')
  };
 
  return(
    <SafeAreaView
      style={{
        height: '100%'
      }}>
        <LovecryptoLogo/>
        <Layout style = {{width: '100%', height: 120, backgroundColor: theme['color-primary-default']}}/>
        <Layout style = {{ top: -120, marginBottom: -120, backgroundColor: 'transparent'}}>
          <Text  style = {{ left:  16}} status  = 'control' category = 'h4'>Recuperar Senha</Text>
          <Layout style = { styles.card}>
            <RecoverPassword navigation = {navigation}/>
          </Layout>
        </Layout>
        <Layout style = {styles.buttonGroup}>
          <Button style = {styles.button}  size='large' status='primary' appearance='ghost' onPress={() => goToLogin()} >Voltar para login</Button>
        </Layout>
    </SafeAreaView>
  )
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonGroup: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'transparent',
  },  
});