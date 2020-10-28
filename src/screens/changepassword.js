//Importações Externas
import React from 'react';
import { useTheme, Layout } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet,}  from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
import { ThemeContext } from '../../theme-context'; 
import { HeroHeader } from '../components/heroHeader';
import { ChangePassword } from '../components/changePassword';
import { TopNavigationHeader } from '../shared/topNavigation';
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader';

const renderContent = () => {
    return (
        <Layout style = { styles.card}>
                <ChangePassword/>
        </Layout>
    )
}

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
            {/* <TopNavigationHeader navigation = {props.navigation}  title = 'Configurações' subtitle = 'alterar senha'/>
            <ScrollView>
            <HeroHeader title = 'Alterar Senha' subtitle = 'Insira sua nova senha'/>
            <Layout style = { styles.card}>
                <ChangePassword/>
            </Layout>
            </ScrollView> */}
            <ReactNativeParallaxHeader
                headerMinHeight={56}
                headerMaxHeight={220}
                extraScrollHeight={20}
                navbarColor= {theme['color-primary-default']}
                backgroundImage={require('../assets/images/forgot_password.jpg')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Editar Senha'}/>}
                renderContent={renderContent}
            />
        </SafeAreaView>
    )
};
  
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 24, 
        borderRadius: 10, 
        justifyContent: 'space-around',
        alignItems: 'center',
        top: -10,
        marginBottom: -10,
    },
    input:{
        marginTop: 16,
    }
  });