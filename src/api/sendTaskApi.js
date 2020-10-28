import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const sendTaskApi = async (id, answers) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  let data =  {task_id: id, answers: answers}
  try{
    await api.post('/tasks/response', data, config).then( response => {
      console.log(response.data)
  });
  }catch ( error ) {
    console.log(error.message)
  }
}