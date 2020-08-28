import React from 'react';
import { Text, useTheme, Layout } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet,}  from 'react-native';

import {ThemeContext} from '../../theme-context'; 
import { TopNavigationHeader } from '../shared/topNavigation';
import { ChangePassword } from '../components/changePassword';

export const ChangePasswordScreen = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme();

    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
            <TopNavigationHeader navigation = {props.navigation}  title = 'Configurações' subtitle = 'alterar senha'/>
            <ScrollView>
            <Layout style = {{width: '100%', height: 250, backgroundColor: theme['color-primary-default'], justifyContent: 'center', alignItems: 'center',}}>
            </Layout>
            <Layout style = {{ top: -200, marginBottom: -200, backgroundColor: 'transparent'}}>
                <Text  style = {{  left:  16}} status  = 'control' category = 'h4'>Alterar Senha</Text>
                <Layout style = { styles.card}>
                   <ChangePassword/>
                </Layout>
            </Layout>
            </ScrollView>
        </SafeAreaView>
    )
};
 


const styles = StyleSheet.create({
    card: {
        shadowColor: "#000", 
        shadowOffset: {	width: 0,	height: 7,},
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14, 
        flexDirection: 'row',
        padding: 32, 
        margin: 16,
        borderRadius: 10, 
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    input: {
        marginTop: 8
    }
  });