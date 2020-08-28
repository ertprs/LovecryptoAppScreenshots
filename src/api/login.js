//Importações Externas
import { api } from './';
import auth from '@react-native-firebase/auth';
 
export const loginApi = async () => {
  let user = null;
  token = await auth().currentUser.getIdToken()

  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log('CONFIG ' + JSON.stringify(config))
  try{
    await api.get('/auth', config).then( response => { 
      user = response.data.user_data
      console.log('Sucesso ao logar na api ' + JSON.stringify(user))
      
    });
  }catch ( error ) {
    console.log('Login api error: ' + error.message)
  }
  return user
}