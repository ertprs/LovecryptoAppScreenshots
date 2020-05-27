import * as firebase from "firebase";
import api from './index'
import { saveData } from '../memoryAccess/saveData'
import { initialConfig } from '../memoryAccess/initialConfig'

export const loginApi = async () => {
  token =  await firebase.auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log('2  ' + JSON.stringify(config))
  try{
      console.log('3  ')
      await api.get('/auth', config).then( response => { 
        console.log('4  ' + JSON.stringify(response))
        let userData = response.data.user_data;
        saveData('@userData', userData)
        initialConfig()
    });
  }catch ( error ) {
    console.log(error.message)
  }
}
