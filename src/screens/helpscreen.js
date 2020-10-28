import { SafeAreaView, ScrollView, StyleSheet, StatusBar }  from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

import { FAQ } from '../components/faq'
import { HelpFooter } from '../components/helpFooter'
import React from 'react';
import {ThemeContext} from '../../theme-context';
import { TopNavigationHeader } from '../shared/topNavigation'
import { SectionBanner } from '../components/sectionbanner';

export const HelpScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
                <StatusBar barStyle="dark-content" />
            <TopNavigationHeader navigation = {props.navigation}  title = 'Ajuda'/>
           
            <Layout style = {{ flex: 1,   padding: 16, textAlign: 'center' }}>
                <Text>Teve Algum Problema?</Text>
                <Text>Envie email para hi@lovecrypto.com</Text>
            </Layout>
       
        </SafeAreaView>
    )
};
 


const styles = StyleSheet.create({
    buttonCase:{
      width: '100%',
      padding: 4,
      padding: 50,
      paddingHorizontal: 48,
    },
  });