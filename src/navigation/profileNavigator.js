import { createStackNavigator, createAppContainer } from 'react-navigation';


import {
    ContactScreen
} from '../screens/Contact'
import {
    PaymentAccountsScreen
} from '../screens/PaymentAccounts'
import {
    LocationScreen
} from '../screens/Location'
import {
    SuportScreen
} from '../screens/Suport'
import {
    NotificationScreen
} from '../screens/Notification'

import {
    DetailScreen
} from '../screens/Detail'
import {
    DetailChangeScreen
} from '../screens/DetailChange'

import {
    AboutScreen
} from '../screens/About'

  
import { LegalNavigator } from '../navigation/legalNavigator'

const DetailNavigator = createStackNavigator({
    Detail : {
        screen: DetailScreen,
        navigationOptions: {
            title: 'Detalhes',
            // headerTitleStyle: { 
            //     textAlign:"center", 
            //     flex:1 
            // },
        },       
    },
    DetailChange:{
        screen: DetailChangeScreen,
        navigationOptions: {
            title: 'Editar',
            // headerTitleStyle: { 
            //     textAlign:"center", 
            //     flex:1 
            // },
        }       
    },
});

export const Navigator = createStackNavigator({
    Account : {
        screen: ContactScreen,
        navigationOptions: {
            header: null,
            //title: 'Meu Perfil',
        }    
    },
    Detail : {
        screen: DetailNavigator,
        navigationOptions: {
            header: null,
            // headerTitleStyle: {
            //     color: 'white'
            // }
            
        }    
    },
    // DetailChange:{
    //     screen: DetailChangeScreen,
    //     navigationOptions: {
    //         title: 'Editar Dado',
    //     }      
    // },
    Payment:{
        screen: PaymentAccountsScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Location:{
        screen: LocationScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Notifications:{
        screen: NotificationScreen,
        navigationOptions: {
            header: null,
        }    
    },
    Suport:{
        screen: SuportScreen,
        navigationOptions: {
            title: 'Suporte',
        }     
    },
    Legal:{
        screen: LegalNavigator,
        navigationOptions: {
            header: null,
        }    
    }, 
    About:{
        screen: AboutScreen,
        navigationOptions: {
            title: 'Sobre o App',
        }    
    }, 
});

export const ProfileNavigator = createAppContainer(Navigator);
