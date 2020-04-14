import { createStackNavigator, createAppContainer } from 'react-navigation';

import{
    LegalScreen,
} from '../screens/Legal'

import{
    ThermsScreen
} from '../screens/Therms'

import{
    PrivacyScreen
} from '../screens/Privacy'

import{
    MyDataScreen
} from '../screens/MyData'

export const Navigator = createStackNavigator({
    Legal:{
        screen: LegalScreen,
        navigationOptions: {
            title: 'Legal',
        }    
    },
    Therms:{
        screen: ThermsScreen,
        navigationOptions: {
            title: 'Termos e Condições',
        }    
    },
    Privacy:{
        screen: PrivacyScreen,
        navigationOptions: {
            title: 'Politica de Privacidade',
        }    
    },
    MyData:{
        screen: MyDataScreen,
        navigationOptions: {
            title: 'Meus Dados',
        }    
    }  
});

export const LegalNavigator = createAppContainer(Navigator);
