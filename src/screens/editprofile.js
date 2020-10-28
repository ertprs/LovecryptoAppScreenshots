//Importações Externas
import React, { Fragment } from 'react';
import {ThemeContext} from '../../theme-context';
import { SafeAreaView, Platform, StatusBar }  from 'react-native';
import { Layout, useTheme } from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
import { generalStyle } from '../shared/generalStyle';
import { TopNavigationHeader } from '../shared/topNavigation';
import { EditProfilePhoto } from '../components/editProfilePhoto';
import { EditProfileComponent } from '../components/editprofilecomponent';
 
import { CustomHeader } from '../shared/customHeader';
 
const renderContent = () => {
  return(
    <Layout style = { generalStyle.cardSection}>
      <EditProfileComponent/>
    </Layout>
  )
}

export const EditProfileScreen = (props) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();
 
  return(
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
        
        <ReactNativeParallaxHeader
          headerMinHeight={56}
          headerMaxHeight={250}
          extraScrollHeight={50}
          alwaysShowTitle={false}
          navbarColor= {theme['color-primary-500']}
          backgroundColor = {theme['color-primary-500']}
          title = { <EditProfilePhoto />}
          renderNavBar={ () =>  <CustomHeader navigation = {props.navigation} title = {'Editar Perfil'} subtitle = {'teddf'}/>}
          renderContent={renderContent}
        />
      </SafeAreaView>
    </Fragment>
  )
};