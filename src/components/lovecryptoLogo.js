import React from "react";
import { StyleSheet, Image, View} from 'react-native'
import { Layout, Text, useTheme, Spinner} from '@ui-kitten/components';
  
//Serve como titulo de seção pelo app
export const LovecryptoLogo = ({size}) => {

    const small = ( size == 'small' ? true : false )

    const theme = useTheme();
    
    return (
        <View style={{width: '100%', padding: small? 24 : 48, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['color-primary-default'] }} >
           <Image style = {{height: small ? 22 : 40, width: small ? 150 : 200}} source = {require ('../assets/images/logo_white.png')}/>
        </View>
        
    );
}
 