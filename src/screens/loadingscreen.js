//Importações Externas
import React from 'react';
import { StatusBar} from 'react-native';
import { Spinner, Layout } from '@ui-kitten/components'

export const LoadingScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <StatusBar
      barStyle={ 'dark-content'}
      backgroundColor={ '#fff'}/>
    <Spinner size = 'giant' status='primary'/>
  </Layout>
);

 
