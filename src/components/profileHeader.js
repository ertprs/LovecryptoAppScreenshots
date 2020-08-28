//Importações Externas
import React  from 'react';
import { Layout, Text, Avatar, Button, Icon} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Image, TouchableWithoutFeedback } from 'react-native'
//Importações Internas
import { generalStyle } from '../shared/generalStyle'
import auth from '@react-native-firebase/auth';
//Serve como titulo de seção pelo app
export const ProfileHeader = ({navigation}) => {

    const state = useSelector(state => state);
    return (   
        <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Detail')}>
        <Layout style = {{ width: '100%', flexDirection: 'column',  alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', padding: 16}}> 
            <Image style = {{height: 76, width: 76, borderRadius: 10}} source={ state.userState.photoUrl == null ? require('../assets/images/avatar.png') : {uri : state.userState.photoUrl}} ></Image>
            <Layout style = {{flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', margin: 16}}>
                <Text appearance = 'alternative' category='h5'>{ state.userState.name }</Text>
                <Text appearance = 'alternative' category='p1'>ID 000000{ state.userState.id }</Text> 
            </Layout>   
        </Layout>  
        </TouchableWithoutFeedback>
    );
}
 
