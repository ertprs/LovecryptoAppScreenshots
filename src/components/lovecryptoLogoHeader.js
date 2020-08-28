import React from "react";
import { Image, View, TouchableWithoutFeedback} from 'react-native'
import { Layout, Text, Icon, Avatar, useTheme, Spinner, Popover} from '@ui-kitten/components';

import auth from '@react-native-firebase/auth';


import { useSelector, useDispatch } from 'react-redux';


var userPhoto = null//auth().currentUser.photoURL;

if( auth().currentUser != null){
    userPhoto = auth().currentUser.photoURL
}


const AvatarIcon = ({navigation, url}) => (
    <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Profile')}>
        <Avatar size='tiny' style={{margin: 8}} shape='rounded'  source={url == null ? require('../assets/images/avatar.png') :  {uri : url}}/>
    </TouchableWithoutFeedback>
);


//Serve como titulo de seção pelo app
export const LovecryptoLogoHeader = ({navigation}) => {
    
    const theme = useTheme();
    const [visible, setVisible] = React.useState(false);
     
    const user = useSelector(state => state.userState);
    
    const renderPasswordIcon = (props) => (
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <Icon fill = 'white' style = {{height: 24, width: 24, margin: 8, marginRight: 0}} name={'bell'}/>
        </TouchableWithoutFeedback>
    );
      
    return (
        <View style={{width: '100%', paddingVertical: 24, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['color-primary-default'], flexDirection: 'row' }} >
            <Image style = {{height:  22, width: 150 }} source = {require ('../assets/images/logo_white.png')}/>
            <Layout style = {{position: 'absolute', flexDirection: 'row', backgroundColor: 'transparent', right: 16}}>
                <AvatarIcon navigation = { navigation } url = {user.photoUrl}/>
                <Popover
                visible={visible}
                anchor={renderPasswordIcon}
                onBackdropPress={() => setVisible(false)}>
                <Layout style={{padding: 24, paddingVertical: 36}}>
                    <Text>Sem novas notificações</Text>
                </Layout>
            </Popover>
            </Layout>
        </View>
    );
}
 