import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const resquestWithrawCrypto = async (address, amount) => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    let data = { "destination_address": address, "amount": amount }
    console.log('CONFIG ' + (config))
    console.log('DATA ' + JSON.stringify(data))
    
    try{
      await api.post('/transactions/transfer', data, config).then( response => {
      return response
    });
    }catch ( error ) {
      return error
    }
  }