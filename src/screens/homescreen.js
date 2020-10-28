//Importações Externas
import React, {Fragment} from 'react';
import { StatusBar, Platform } from 'react-native';
import { useTheme } from '@ui-kitten/components';
 
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
import { ThemeContext } from '../../theme-context';
import { SurveyList } from '../components/surveylist';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderTitle } from '../components/headertitle';
import { HeaderWallet } from '../components/headerwallet';
import { LovecryptoLogoHeader } from '../components/lovecryptoLogoHeader';
 


export const Homescreen = (props) => {
  
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme();
 
  const renderContent = () => {
    return(
      <Fragment>
        <HeaderTitle title = 'Tarefas'/>
        <SurveyList navigation = {props.navigation}/>
      </Fragment>
    )
  }

  return (
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
        <StatusBar barStyle="light-content" />
        <ReactNativeParallaxHeader
          headerMinHeight={70}
          headerMaxHeight={250}
          extraScrollHeight={50}
          alwaysShowTitle={false}
          navbarColor= {theme['color-primary-500']}
          backgroundColor = {theme['color-primary-500']}
          title = { <HeaderWallet navigation = {props.navigation}/>}
          renderNavBar={ () =>   <LovecryptoLogoHeader navigation = {props.navigation}/>}
          renderContent={renderContent}
        />
      </SafeAreaView>
    </Fragment>
  );
};
