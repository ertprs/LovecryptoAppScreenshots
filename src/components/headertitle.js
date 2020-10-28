import React from "react";
import { StyleSheet } from 'react-native'
import { Layout, Text} from '@ui-kitten/components';

//Serve como titulo de seção pelo app
export const HeaderTitle = ({title}) => {
    return (
        <Layout level = '2' style={styles.header}>
            <Text category='h6' status = 'primary' style = {{fontWeight: 'bold'}}>{ title }</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 12,
        paddingLeft: 20,
        paddingTop: 20, 
    },
})