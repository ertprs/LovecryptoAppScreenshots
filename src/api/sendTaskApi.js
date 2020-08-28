import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const sendTaskApi = async (id, answers) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log('TOKEN ' + token)
  let data =  {task_id: id, answers: answers}
  console.log('DATA ' + JSON.stringify(data))
  
  try{
    await api.post('/tasks/response', data, config).then( response => {
      return response
  });
  }catch ( error ) {
    return error
  }
}