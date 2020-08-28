//Importações Externas
import React from 'react';
import {ThemeContext} from '../../theme-context';
import { SafeAreaView, ScrollView, StatusBar }  from 'react-native';
import { Layout, useTheme } from '@ui-kitten/components';

//Importações Internas
import { generalStyle } from '../shared/generalStyle';
import { TopNavigationHeader } from '../shared/topNavigation';
import { EditProfilePhoto } from '../components/editProfilePhoto';
import { EditProfileComponent } from '../components/editprofilecomponent';

export const EditProfileScreen = (props) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();
 
  return(
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <TopNavigationHeader navigation = {props.navigation} title = 'Editar Perfil'/>
      <ScrollView>
        <Layout style = {{width: '100%', height: 260, backgroundColor: theme['color-primary-default'], justifyContent: 'center', alignItems: 'center',}}/>
        <Layout style = {{ top: -260, marginBottom: -260, backgroundColor: 'transparent', }}>
          <EditProfilePhoto />
          <Layout style = { generalStyle.cardSection}>
            <EditProfileComponent/>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
};