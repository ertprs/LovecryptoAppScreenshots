import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text} from 'react-native-ui-kitten';

//Serve como titulo de seção pelo app
export const Header = (props) => {

    const {title} = props;

    return (
        <Layout style={styles.header} level='1'>
        <Text category='h6'>{title}</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        paddingLeft: 24,
    },
})
