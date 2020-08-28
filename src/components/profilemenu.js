//Importações Externas
import React from 'react';
import { Layout } from '@ui-kitten/components';
import { generalStyle } from '../shared/generalStyle'

//Importações Internas
import { ProfileOption } from './profileoption';

//Serve como titulo de seção pelo app
export const ProfileMenu = props => {
    return (
        
        <Layout style = {generalStyle.cardSection}>
            <ProfileOption route ='Detail' title = 'Editar Perfil' icon = 'edit-outline' navigation = { props.navigation}/>
            <ProfileOption route ='Settings' title = 'Configurações' icon = 'settings-2-outline' navigation = { props.navigation}/>
            {/* <ProfileOption route ='AssociedAccounts' title = 'Contas Associadas' icon = 'credit-card-outline' navigation = { props.navigation}/> */}
            <ProfileOption route ='ShareApp' title = 'Indique e Ganhe' icon = 'share-outline' navigation = { props.navigation}/>
            <ProfileOption route ='Legal' title = 'Legal' icon = 'file-text-outline' navigation = { props.navigation}/>   
            <ProfileOption route ='Suport' title = 'Ajuda' icon = 'question-mark-circle-outline' navigation = { props.navigation}/>
        </Layout>
      
    );
}
 
