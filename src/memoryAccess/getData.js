import { AsyncStorage } from "react-native";

export const getData = async(KEY) =>{
    let DATA = null;
    try {
      DATA = await AsyncStorage.getItem(KEY) || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return JSON.parse(DATA)
}
  