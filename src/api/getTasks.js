import { api } from './'
import auth from '@react-native-firebase/auth';

export const  getTasks = async () =>{
  tasks = null;
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
      await api.get('/tasks', config).then( response => {
          tasks = response.data
         
      });
      }catch ( error ) {
          console.log(error.message)
      }
  return tasks
}