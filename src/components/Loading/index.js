import React from "react";
import { StyleSheet } from "react-native";
import {
  Spinner, Layout
} from 'react-native-ui-kitten'

const styles = StyleSheet.create({ 
  spinner:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
});

export const Loading = () => {
  return (
    <Layout style = {styles.spinner}>
      <Spinner status='success' size='giant'/>
    </Layout>
  );
};
