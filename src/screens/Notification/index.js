import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, ListItem, Toggle} from 'react-native-ui-kitten'
import { Ionicons } from "@expo/vector-icons";

const AppIcon = ( ) => (
  <Ionicons name="md-phone-portrait" size={20} color="#000" />
);

const SmsIcon = ( ) => (
  <Ionicons name="md-chatboxes" size={20} color="#000" />
);

const MailIcon = ( ) => (
  <Ionicons name="md-mail" size={20} color="#000" />
);

const renderItemAccessorySMS = (index) => (
  <Toggle
    checked={state.sms}
    onChange={changeSms}
/>
);

const renderItemAccessoryEmail = (index) => (
  <Toggle
    checked={state.email}
    onChange={changeEmail}
/>
);

const renderItemAccessoryApp = (index) => (
  <Toggle
    checked={state.app}
    onChange={changeApp}
/>
);

const drawerData = [
  { title: 'App', icon: AppIcon, checked: true},
  { title: 'SMS', icon: SmsIcon, checked: false },
  { title: 'Email', icon: MailIcon, checked: false },
];

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

export class NotificationScreen extends Component {
    
  render() {
    return (
      <Layout style = {styles.container}>
        <ScrollView>
        <ListItem title={"No APP"} onPress = {changeApp} icon={AppIcon} accessory = {renderItemAccessoryApp} />
        <ListItem title={"SMS"}  onPress = {changeSms} icon={SmsIcon} accessory = {renderItemAccessorySMS} />
        <ListItem title={"Email"}  onPress = {changeEmail}icon={MailIcon} accessory = {renderItemAccessoryEmail} />
      </ScrollView>
      <Toggle
          text={`Light/Dark Mode`}
          checked={checked}
          onChange={onCheckedChange}
        />
      </Layout>
    );
  }
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