import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from '@ui-kitten/components'


export const LocationScreen = (props) => {
  return (
    <View>
      <ScrollView>
        <Text>Localização</Text>
      </ScrollView>
    </View>
  );
}

