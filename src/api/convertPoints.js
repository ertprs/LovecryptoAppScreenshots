import { api } from '.'
import auth from '@react-native-firebase/auth';

export const convertPointsApi = async() => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  data = {
    qtd_points: 1000
  } 

  console.log('TOKEB ' + JSON.stringify(token))
  console.log('DATA' + JSON.stringify(data))
   
  return await api.post('/change', data, config)
}