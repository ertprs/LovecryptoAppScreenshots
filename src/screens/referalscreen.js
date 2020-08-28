//Importações Externas
import React from 'react';
import { StyleSheet, SafeAreaView,} from 'react-native'
import { Text, Layout, Button, useTheme} from '@ui-kitten/components'

//Importações internas
import { ReferalCode } from '../components/referalCode';
import { LovecryptoLogo } from '../components/lovecryptoLogo'
import { HeroHeader } from '../components/heroHeader'
export const ReferalScreen = ({ navigation}) => {
 
  const signup = async () => {
    navigation.navigate('Signup')
  };
 
  return(
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: 'white'
      }}>
      {/* <LovecryptoLogo/> */}
      <HeroHeader title = 'Código de indicação' subtitle = 'Ao usar um código você já começa ganhando'/>
      <Layout style = {{padding: 24, top: -10, marginBottom: -10, borderRadius: 10, }}>
        <ReferalCode navigation = {navigation}/>
      </Layout>
      <Layout style = {styles.buttonGroup}>
        <Text appearance = 'hint' style = {{marginBottom: 8}}>Não tem código de indicação?</Text>
        <Button size='large' status='primary' appearance='ghost' onPress={() => signup()} >Continue sem código</Button>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    padding: 24,
    backgroundColor: 'transparent',
  },
});