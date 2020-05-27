import { AsyncStorage } from "react-native";

export async function saveData(KEY, DATA){
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(DATA));
    } catch (error) {
        console.log(error.message);
        console.log('error saving data '+ KEY)
    }
}