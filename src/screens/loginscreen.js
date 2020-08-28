//Importações Externas
import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'

//Importações Internas
import { AuthForm } from '../components/AuthForm';
import { LovecryptoLogo } from '../components/lovecryptoLogo'
 
export const LoginScreen = ( props ) => {
  const theme = useTheme();
  return(
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: theme['color-primary-default'],
      }}>
      <ScrollView >
          <LovecryptoLogo/>
          <AuthForm navigation = {props.navigation}/>
      </ScrollView>
    </SafeAreaView>
  )
};