import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Text, Icon, Layout, Avatar, Button} from '@ui-kitten/components';
 
const EditIcon = (props) => (
    <Icon {...props} name='edit-outline'/>
);

const DeleteIcon = (props) => (
    <Icon {...props} name='trash-outline'/>
); 
 
export const Account = (props) => {

    const wallet = useSelector(state => state.withdrawState);
    const type = props.type;
 
    return(
        <Layout  style = {{ borderRadius: 10, marginVertical: 4, width: '100%', borderColor: '#E7ECF4', borderWidth: 1 }}>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => console.log('to do')}>
                <Layout  level='2' style = {{ width: '100%', padding: 16, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', borderRadius: 10}}>
                    <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Avatar  shape='rounded' source={type == 'crypto' ? require('../assets/images/CeloIcon.jpg') : require('../assets/images/bank_account.png') } style = {{ marginTop: 4}}/>
                        {type =='crypto' &&
                            <Layout style = {{backgroundColor: 'transparent'}}>
                                <Text category = 'p1' status = 'primary' style = {{ marginLeft: 10, marginTop: 3 }}>{ wallet.cryptoWallet.id }</Text> 
                                <Text category = 'c1' appearance='hint' style = {{ marginLeft: 10, marginTop: 3 }}>{  wallet.cryptoWallet.address.slice(0, 10) + '...' + wallet.cryptoWallet.address.slice(-8) }</Text>
                            </Layout>
                        }
                        {type == 'fiat' &&
                            <Text category = 'p1' status = 'primary' style = {{ marginLeft: 16, marginTop: 16 }}>{ wallet.fiatWallet.phone }</Text>
                        }
                     
                    </Layout>
                    { props.accessory == 'alterable' && 
                    <Button status = 'success' onPress = {() => props.navigation.navigate('Addaccount', {type: props.type})}>
                        Alterar
                    </Button>
                    }
                    { props.accessory == 'editable' &&
                    <Layout style = {{ flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Button
                            size='small'
                            appearance='ghost'
                            accessoryLeft={EditIcon}
                            onPress = {() => alert('to do')}>
                        </Button>
                        <Button
                            size='small'
                            appearance='ghost' 
                            accessoryLeft={DeleteIcon}
                            onPress = {() => alert('to do')}>
                        </Button>
                    </Layout>
                    }
                </Layout>
            </TouchableNativeFeedback>
        </Layout>
    )
}
     