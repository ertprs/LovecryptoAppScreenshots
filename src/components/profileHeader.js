//Importações Externas
import React  from 'react';
import { useSelector } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { Image, Platform, TouchableWithoutFeedback } from 'react-native';
 
//Serve como titulo de seção pelo app
export const ProfileHeader = ({navigation}) => {

    const state = useSelector(state => state);
    return (   
        <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Detail')}>
        <Animatable.View  animation="bounceIn" duration = {1000} style = {{ width: '100%', flexDirection: 'column',  alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', padding: 16, marginTop: Platform.OS == 'ios' ? 20 : 50}}> 
            <Image style = {{height: 76, width: 76, borderRadius: 10}} source={ state.userState.photoUrl == null ? require('../assets/images/avatar.png') : {uri : state.userState.photoUrl}} ></Image>
            <Layout style = {{flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', margin: 16}}>
                <Text appearance = 'alternative' category='h5'>{ state.userState.name }</Text>
                <Text appearance = 'alternative' category='p1'>ID 000000{ state.userState.id }</Text> 
            </Layout>   
        </Animatable.View>  
        </TouchableWithoutFeedback>
    );
}
 
