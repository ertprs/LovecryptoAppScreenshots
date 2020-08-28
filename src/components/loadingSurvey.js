import {
    Layout,
    } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const RenderItem = () => (
    <Layout style = {styles.surveyContainer}>
        <Layout style={styles.infoTextContainer}>
            <ShimmerPlaceHolder  autoRun={true} style = {{height: 30, marginTop: 8,}}/>
            <Layout style = {{display: 'flex', flexDirection: 'row', paddingVertical: 16}}>
                <ShimmerPlaceHolder autoRun={true} style = {styles.info}/>
                <ShimmerPlaceHolder autoRun={true} style = {styles.info}/>
            </Layout>
            <ShimmerPlaceHolder  autoRun={true} style = {{height: 20}}/>
        </Layout>
        <Layout style = {styles.ButtonContainer}>
            <ShimmerPlaceHolder autoRun={true} style = {styles.button}/>
            <ShimmerPlaceHolder autoRun={true} style = {styles.button}/>
        </Layout>
    </Layout>
);

export const LoadingSurvey = (props) => {
    return(
        <RenderItem/>
    )
}

const styles = StyleSheet.create({
    info:{
        borderRadius: 16,
        marginRight: 8,
        width: 80,
        height: 30,
    },
    infoTextContainer: {
        minHeight: 100,
        padding: 16,
        paddingTop: 24,
    },
    surveyContainer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        alignContent: 'center',
        padding: 5,
        flexGrow: 0,
    },
    ButtonContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 16,
        paddingTop:40,
        paddingBottom: 24,
    },
    button:{
        height: 45,
        width: 100,
        borderRadius: 5,
    }
});