import React from 'react';
import { Text, Icon, Layout} from '@ui-kitten/components';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export const ProfileOption = (props) => (
    <Layout  style = {{ borderRadius: 10, marginVertical: 8, width: '100%', borderColor: '#E7ECF4', borderWidth: 1 }}>
        <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => props.navigation.navigate(props.route)}>
            <Layout  level='2' style = {{ width: '100%', padding: 16, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', borderRadius: 10}}>
                <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                    <Icon fill='#222B45' style = {{height: 24, width: 24}} name= {props.icon}/>
                    <Text category = 'p1' style = {{ marginLeft: 10, marginTop: 3 }}>{props.title}</Text>
                </Layout>
                <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='arrow-ios-forward-outline'/>
            </Layout>
        </TouchableNativeFeedback>
    </Layout>
    
);