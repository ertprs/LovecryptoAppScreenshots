import React from "react";
import {
  Spinner, 
  Layout
} from '@ui-kitten/components'
import { StyleSheet } from "react-native";


export const Loading = () => {
  return (
    <Layout style = {styles.spinner}>
      <Spinner status='success' size='giant'/>
    </Layout>
  );
};

const styles = StyleSheet.create({ 
  spinner:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
});