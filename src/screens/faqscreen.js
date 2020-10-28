import { SafeAreaView, ScrollView, StyleSheet, StatusBar }  from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { FAQ } from '../components/faq'
import { HelpFooter } from '../components/helpFooter'
import React from 'react';
import {ThemeContext} from '../../theme-context';
import { TopNavigationHeader } from '../shared/topNavigation'

export const FaqScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
                <StatusBar barStyle="dark-content" />
            <TopNavigationHeader navigation = {props.navigation}  title = 'FAQ'/>
            <ScrollView>
                <FAQ/>
                <HelpFooter navigation = {props.navigation}/>
            </ScrollView>
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