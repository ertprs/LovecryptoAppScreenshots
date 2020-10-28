import { api } from './'
import auth from '@react-native-firebase/auth';

export const registerApi = async(email, name, uid, code) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  data = {
    email: email,
    name: name,
    firebase_uid: uid,
    recommended_by: code
  } 
  return await api.post('/register', data, config)
  // try{
  //     await api.post('/register', data, config)
  //     console.log('Sucesso ao cadastrar na api')
  //     auth().currentUser.sendEmailVerification()
  // }catch ( error ) {
  //   console.log('Signup api error: ' + error.message)
  // }
}