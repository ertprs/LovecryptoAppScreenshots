import React from "react";
import { Image} from "react-native";
import { Text, Layout } from '@ui-kitten/components'
import { generalStyle } from '../../shared/generalStyle';



export const ChatScreen = (props) => {
  return (
    <Layout style = {generalStyle.container}>
      <Image style = {generalStyle.topImageIcon} source={require('../../assets/images/support_icon.png')} ></Image>
      <Text style = {generalStyle.title} category='h6' >Teve algum problema?</Text> 
      <Text style = {generalStyle.paragraph}>Envie email para hi@lovecrypto.net explicando detalhadamente o erro apresentado no app e se possivel, um screenshot do erro</Text>
      <Text style = {generalStyle.paragraph} category = 's1' appearance = 'hint' >Nosso app está em beta, nos perdoem pelos bugs :)</Text>   
    </Layout>
  );
}

