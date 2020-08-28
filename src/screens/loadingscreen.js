import React from 'react';
import { View} from 'react-native'
import { Spinner, Text, Layout } from '@ui-kitten/components'

export const LoadingScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size = 'giant' status='success'/>
  </Layout>
);

 
