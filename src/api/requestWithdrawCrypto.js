import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const resquestWithrawCrypto = async (address, amount) => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    data = { "destination_address": address, "amount": amount }
    
    console.log('DATA enviado ' + JSON.stringify(data))

    return await api.post('/transactions/transfer', data, config)
    
  }