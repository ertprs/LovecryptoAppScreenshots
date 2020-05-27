import { api } from '.'
import * as firebase from "firebase";

export async function getTasks (){
    tasks = null;
    token = await firebase.auth().currentUser.getIdToken()
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
      // console.log(tasks)
    return tasks
}