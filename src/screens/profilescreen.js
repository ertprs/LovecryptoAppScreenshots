//Importações Externas
import React from 'react';
import { useTheme, Layout,} from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

//Importações Internas
import { ThemeContext } from '../../theme-context';
import { ProfileMenu } from '../components/profilemenu';
import { ProfileHeader } from '../components/profileHeader';
import { ProfileFooter } from '../components/profileFooter';
import { LovecryptoLogo } from '../components/lovecryptoLogo';

 
export const ProfileScreen =  props  => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();

  return(
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <ScrollView>
        <LovecryptoLogo size = 'small'/>
        <Layout style = {{width: '100%', height: 200, backgroundColor: theme['color-primary-default']}}/>
        <Layout style = {{  backgroundColor: 'transparent', top: -200, marginBottom: -200 }}>
            <ProfileHeader navigation = { props.navigation }/>
            <ProfileMenu navigation = { props.navigation }/>
            <ProfileFooter/>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
};