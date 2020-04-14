import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { Layout, Drawer} from 'react-native-ui-kitten'

const drawerData = [
  { title: 'Termos e Condições', target: 'Therms'},
  { title: 'Politica de privacidade', target: 'Privacy'},
  { title: 'Meus dados', target: 'MyData'},
];

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
});


export class LegalScreen extends Component {

  onSelect = (index) => {
    console.log(drawerData[index].target)
    this.props.navigation.navigate(drawerData[index].target)
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Drawer style = {styles.drawer}
            data={drawerData}
            onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}
