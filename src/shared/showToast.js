import { ToastAndroid,} from 'react-native';

export const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export const showErrorToast = (errorCode) => {
    var msg = null;
    if(errorCode == 'SC error'){
        msg = `Error: Código de erro ${100}` 
    }
    ToastAndroid.show(msg, ToastAndroid.LONG);
};