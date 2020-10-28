import React from 'react';
import { SafeAreaView, ScrollView, ImageBackground, StatusBar, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Divider, Layout, useTheme, Text, Icon, TopNavigationAction, useThe} from '@ui-kitten/components';
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    navContainer: {
      // height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    
    navBar: {
      // height: NAV_BAR_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      padding: 8,
      paddingVertical: 16
      
    },
    titleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });


  const BackIcon = (style) => (
    <Icon {...style} color = '#fff' name='arrow-back'/>
  );
   

  const RenderBackAction = (props) => (
    <TopNavigationAction appearance = 'control' icon={BackIcon} onPress = {() => props.navigation.goBack()}/>
  );


export const CustomHeader = (props) => (
    <View style = {{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent', padding: 8, paddingVertical: 16 }}>
      <RenderBackAction navigation = {props.navigation}/>
      <Layout style = {{flexDirection: 'column', backgroundColor: 'transparent', alignItems: 'center'}}>
        <Text category='s1' status = 'control'>{props.title}</Text>
        {/* <Text status = 'control' category='c1' >{props.subtitle}</Text>  */}
      </Layout>
      <Layout style = {{width: 24, height: 24, marginHorizontal: 8, backgroundColor: 'transparent'}}>

      </Layout>
     
    </View>
);