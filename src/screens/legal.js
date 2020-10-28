import React from "react";
import { TouchableNativeFeedback, StatusBar } from "react-native";
import { Layout, Icon, Text } from '@ui-kitten/components'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import {ThemeContext} from '../../theme-context'; 
import { TopNavigationHeader } from '../shared/topNavigation'

const NavOption = (props) => (
  <Layout style = {{  width: '100%', borderColor: '#E7ECF4', borderBottomWidth: 1 }}>
      <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => props.navigation.navigate(props.route)}>
        <Layout style = {{ width: '100%', padding: 16, justifyContent: 'space-between', display: 'flex', flexDirection: 'row',  borderRadius: 10}}>
            <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                <Icon fill='#222B45' style = {{height: 24, width: 24}} name= {props.icon}/>
                <Text category = 'p1' style = {{ marginLeft: 10, marginTop: 3 }}>{props.title}</Text>
            </Layout>
            <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='arrow-ios-forward-outline'/>
        </Layout>
    </TouchableNativeFeedback>
  </Layout>
);

export const LegalScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
 
    return (
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
            <StatusBar barStyle="dark-content" />
            <TopNavigationHeader navigation = {props.navigation}  title = 'Legal'/>
            <ScrollView>
                <Layout level = '1'  style = {{ flex: 1}}>
                    <NavOption title ='Termos e Condições' icon = 'file-outline' navigation = { props.navigation } route = 'Terms'/>
                    <NavOption title ='Politica de privacidade' icon = 'shield-outline' navigation = { props.navigation } route = 'PrivacyPolicy'/>
                    <NavOption title ='Meus Dados' icon = 'hard-drive-outline' navigation = { props.navigation } route = 'MyData'/> 
                </Layout>
            </ScrollView>
        </SafeAreaView>
   
    );
}