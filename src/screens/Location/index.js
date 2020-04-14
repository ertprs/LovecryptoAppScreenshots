import React, { Component } from "react";
import { View, StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text} from 'react-native-ui-kitten'



export class LocationScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView>
        <Text>Localização</Text>
      </ScrollView>
      </View>
    );
  }
}
