//Importações Externas
import React, { Fragment } from 'react';
import { SafeAreaView , Platform} from 'react-native';
import { useTheme, Layout,} from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

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

  const renderContent = () => {
    return(
      <Layout>
        <ProfileMenu navigation = { props.navigation }/>
        <ProfileFooter/>
      </Layout>
    )
  }
 
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
          headerMinHeight={70}
          headerMaxHeight={250}
          extraScrollHeight={50}
          alwaysShowTitle={false}
          navbarColor= {theme['color-primary-500']}
          backgroundColor = {theme['color-primary-500']}
          title = { <ProfileHeader navigation = { props.navigation }/>}
          renderNavBar={ () => <LovecryptoLogo size = 'small'/>}
          renderContent={renderContent}
        />
      </SafeAreaView>
    </Fragment>
  )
};