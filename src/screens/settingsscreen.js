//Importações Exernas
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout, ListItem, Text, Toggle, Divider, Icon } from '@ui-kitten/components';

//Importações Internas
import { showToast } from '../shared/showToast';
import { ThemeContext } from '../../theme-context';
import { TopNavigationHeader } from '../shared/topNavigation';
import { toggleAppNotifications, toggleEmailNotifications, toggleDarkMode } from '../store/actions/config';

export const SettingsScreen = (props) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const renderItemAccessoryEmail = (props) => (
    <Toggle
      checked={state.configState.email}
      onChange={emailToggle}
    />
  );

  const renderItemAccessoryApp = (props) => (
    <Toggle
      checked={state.configState.notifications}
      onChange={appToggle}
    />
  );

  const renderItemAccessoryDarkMode = (props) => (
    <Toggle
      checked={state.configState.darkMode}
      onChange={darkToggle}
      // disabled={true} 
    />
  );

  function darkToggle(props){
    dispatch(toggleDarkMode(!state.configState.darkMode))
    // themeContext.toggleTheme()
  }

  function appToggle(){
    dispatch(toggleAppNotifications(!state.configState.notifications))
  }

  function emailToggle(){
    dispatch(toggleEmailNotifications(!state.configState.email))
  }

  const Subtitle = (props) => (
    <Layout style = {{padding: 16, paddingBottom: 4, flexDirection: 'row'}}>
      <Icon fill='#222B45' style = {{height: 13, width: 13, alginSelf: 'right', marginRight: 6, marginTop: 2}} name={props.icon}/>
      <Text category = 'c1'>{props.title}</Text>
    </Layout>
  );
  
  return(
    <SafeAreaView
      style={{
      flex: 1,
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      <TopNavigationHeader navigation = {props.navigation}  title = 'Configurações'/>
      <ScrollView>
        <Layout style = {{ flex: 1,}}>
          <Subtitle title = 'Alertas' icon = 'bell-outline'/>
          <ListItem title={"No APP"}  accessoryRight = {renderItemAccessoryApp}/> 
          <ListItem title={"Email"} accessoryRight = {renderItemAccessoryEmail}/> 
          <Divider/>
          <Subtitle title = 'Opções de linguagem' icon = 'globe-outline'/>
          <ListItem title={"Moeda"} accessoryRight = {() => <Text appearance='hint'>{config.currency}</Text>} onPress = { () => showToast('Opção indisponível')}/>
          <ListItem title={"Lingua"} accessoryRight = {() => <Text appearance='hint'>{config.language}</Text>} onPress = { () => showToast('Opção indisponível')}/>
          <Divider/>
          <Subtitle title = 'Visual' icon = 'sun'/>
          <ListItem title={"Dark Mode"} accessoryRight = {renderItemAccessoryDarkMode}/>  
          <Divider/>
          { state.authState.provider == 'EMAIL' &&
          <Subtitle title = 'Segurança' icon = 'lock-outline'/> 
          }
          { state.authState.provider == 'EMAIL' &&
          <ListItem title={"Alterar Senha"}  onPress = {() => props.navigation.navigate('ChangePassword')}/>
          }
        </Layout>      
      </ScrollView>
    </SafeAreaView>
  )
};