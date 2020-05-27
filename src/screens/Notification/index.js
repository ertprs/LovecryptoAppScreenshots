import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, ListItem, Toggle, Icon, Text, Button} from '@ui-kitten/components'
import { Ionicons } from "@expo/vector-icons";
import { Header } from '../../components/Header'

import { ThemeContext } from '../../../theme-context';
const AppIcon = (props ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='bell-outline'/>
);

const SmsIcon = ( ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='message-circle-outline'/>
);

const MailIcon = ( ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='email-outline'/>
);

const DarkIcon = ( ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='sun-outline'/>
);

const ArrowIcon = ( ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='arrow-ios-forward-outline'/>
);

const LockIcon = ( ) => (
  <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='lock-outline'/>
);


let state = {
  email: false,
  sms: false,
  app: true,
  type: []
} 

let checked = false;
let setChecked = false;

onCheckedChange = () => {
  checked = !checked;
};

const changeSms = () => {
  state.sms = !state.sms;
};

const changeApp = () => {
  state.app = !state.app;
};

const changeEmail = () => {
  state.email = !state.email;
};

export const NotificationScreen = (props) => {
  const themeContext = React.useContext(ThemeContext);

  const [checkedDark, setCheckedDark] = React.useState(false);
  const [checkedApp, setCheckedApp] = React.useState(true);
  const [checkedSms, setCheckedSms] = React.useState(true);
  const [checkedEmail, setCheckedEmail] = React.useState(true);


  // function toggleTheme() {}(
  //   setCheckedDark()
  //   toggleTheme()
  // );
  
const renderItemAccessorySMS = (index) => (
  <Toggle
    checked={checkedSms}
    onChange={setCheckedSms}
/>
);

const renderItemAccessoryEmail = (index) => (
  <Toggle
    checked={checkedEmail}
    onChange={setCheckedEmail}
/>
);

const renderItemAccessoryApp = (index) => (
  <Toggle
    checked={checkedApp}
    onChange={setCheckedApp}
/>
);

const renderItemAccessoryDarkMode = (index) => (
  <Toggle
    checked={checkedDark}
    onChange={darkToggle}
/>
);

function darkToggle(){
  setCheckedDark(!checkedDark)
  themeContext.toggleTheme()
}

const Subtitle = (props) => (
  <Layout style = {{padding: 4, paddingLeft:24,}}>
    <Text category = 'c1'>{props.title}</Text>
  </Layout>
);

  return (
    <Layout style = {{paddingVertical: 24}}>
      {/* <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button> */}
      {/* <Header type = 'subtitle' title = 'Alertas'/> */}
      <Subtitle title = 'Alertas'/>
      <ListItem title={"No APP"}  icon={AppIcon} accessory = {renderItemAccessoryApp} />
      {/* <ListItem title={"SMS"} icon={SmsIcon} accessory = {renderItemAccessorySMS} /> */}
      <ListItem title={"Email"}  icon={MailIcon} accessory = {renderItemAccessoryEmail} />
      <Subtitle title = 'Visual'/>
      <ListItem title={"Dark Mode"}  icon={DarkIcon} accessory = {renderItemAccessoryDarkMode} />
      <Subtitle title = 'Segurança'/>
      <ListItem title={"Alterar Senha"}  onPress = {() => props.navigation.navigate('ChangePassword')}icon={LockIcon} accessory = {ArrowIcon} />
    
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  text:{
    color : '#7A05C8'
  },
});