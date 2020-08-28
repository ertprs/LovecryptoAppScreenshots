//Importações Externas
import React from 'react';
import { Layout, useTheme} from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet }  from 'react-native';

//Importações Internas
import { ThemeContext } from '../../theme-context';
import { HeroHeader } from '../components/heroHeader';
import { AddAccountBank } from '../components/addAccountBank';
import { TopNavigationHeader } from '../shared/topNavigation';
import { AddAccountCrypto } from '../components/addAccountCrypto';

export const AddAccountScreen = (props) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const type = props.route.params.type;

  return(
    <SafeAreaView
      style={{
      flex: 1,
      height: '100%',
      backgroundColor: currentTheme === 'light' ? 'white' : '#222B45',
      }}>
      <TopNavigationHeader navigation = {props.navigation}  title = 'Transferencia' subtitle = 'crypto'/>
      <ScrollView>
        <HeroHeader title = 'Destino' subtitle = 'Para qual conta deseja enviar?'/>
        <Layout style = {{padding: 24, top: -10, marginBottom: -10, borderRadius: 10}}>
          { type == 'crypto' ? 
          <AddAccountCrypto navigation = {props.navigation}/> :
          <AddAccountBank navigation = {props.navigation}/>
          }
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