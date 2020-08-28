//Importações Externas
import React, { useState, Fragment } from 'react';
import { 
    Layout, 
    Text, 
    Button, 

    Modal, 
    Card,
    useTheme,
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native'

//Importações Internas
import { signOut } from '../store/actions/auth';
import { removeUser } from '../store/actions/user';
import { generalStyle } from '../shared/generalStyle';
import { clearWallet } from '../store/actions/withdraw';

const StarIcon = (props) => (
    <Icon {...props} name='star'/>
);



//Serve como titulo de seção pelo app
export const ProfileFooter = props => {

    
    const FbIcon = (props) => (
        <Icon {...props} name='facebook' size={18} color={theme['color-primary-default']} solid/>
    );


    const GlobeIcon = (props) => (
        <Icon {...props} name='globe' size={18} color={theme['color-primary-default']} solid/>
    );


    const InstagramIcon = (props) => (
        <Icon {...props} name='instagram' size={18} color={theme['color-primary-default']} solid/>
    );

    const theme = useTheme();
 
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const signout = async () => {
        setVisible(false)
        await auth().signOut();
        dispatch(signOut())
        dispatch(removeUser())
        dispatch(clearWallet())
    };
   
    return (  
        <Fragment>
            <Modal
            visible={visible}
            backdropStyle={generalStyle.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
                <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon fill='white' style = {{height: 24, width: 24, alginSelf: 'right'}} name='log-out-outline'/>
                </Layout>
                <Text  style = {{marginTop: 8}} category = 'h6'>Logout</Text>
                <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>Tem certeza que deseja sair?</Text>
                <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                    <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                    CANCELAR
                    </Button>
                    <Button style = {{margin: 12}} status = 'danger' onPress={() => signout()}>
                    DESLOGAR
                    </Button>
                </Layout>
                </Layout>          
            </Card>
            </Modal>
            <Layout style = {{flex: 1, padding: 48, alignItems: 'center', width: '100%'}}>
                <Text category='c1'>Nos acompanhe nas redes sociais</Text>
                <Layout style = {{padding: 24, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button status='basic' onPress = { () => Linking.openURL('https://www.lovecrypto.net/')} accessoryLeft={GlobeIcon}/>
                    <Button status='basic' onPress = { () => Linking.openURL('https://www.facebook.com/lovecryptoapp/')} accessoryLeft={FbIcon}/>
                    <Button status='basic' onPress = { () => Linking.openURL('https://www.instagram.com/lovecryptoweb/')} accessoryLeft={InstagramIcon}/>
                </Layout>
                <Button appearance='outline' status = 'info' style = {{width: '80%', marginTop: 24}} onPress={() =>  setVisible(true)}>Deslogar</Button>
                <Text category='s2' style = {{ marginTop: 60, }}>Lovecrypto Inc</Text>
                <Text category='c1' style = {{ marginTop: 10, }} appearance='hint'>Lovecrypto para Android - versão DEV TEST</Text>
               
            </Layout>
        </Fragment>
    );
}
 
