import { AsyncStorage } from "react-native";

export async function initialConfig( ){
    try {
        await AsyncStorage.setItem('@dark', false);
        await AsyncStorage.setItem('@inAppNotifications', true);
        await AsyncStorage.setItem('@emailNotifications', true);
        console.log(await AsyncStorage.getItem('@dark'))
    } catch (error) {
        console.log(error.message);
        console.log('error saving data '+ KEY)
    }
}