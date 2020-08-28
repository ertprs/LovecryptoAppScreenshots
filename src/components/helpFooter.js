//Importações Externas
import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
 
//Serve como titulo de seção pelo app
export const HelpFooter = props => {
    return (
        
        <Layout style = {{flex: 1, padding: 48, alignItems: 'center', width: '100%'}}>
            <Button appearance='outline' status = 'info' style = {{width: '80%'}} onPress={() =>  props.navigation.navigate('Help')}>Fale Conosco</Button>
        </Layout>
      
    );
}
 
