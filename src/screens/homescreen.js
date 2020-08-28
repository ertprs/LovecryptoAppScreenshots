//Importações Externas
import React from 'react';
import {StatusBar } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

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
 
  return (
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <StatusBar
      barStyle={'light-content'}
      backgroundColor={currentTheme === 'light' ?  theme['color-primary-default'] : '#222B45'}
      />
      <ScrollView>
        <LovecryptoLogoHeader navigation = {props.navigation}/>
        <HeaderWallet navigation = {props.navigation}/>
        <HeaderTitle title = 'Tarefas'/>
        <SurveyList navigation = {props.navigation}/>
      </ScrollView>
    </SafeAreaView>
  );
};
