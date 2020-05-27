import * as firebase from "firebase";
import api from './'
 

export const registerApi = async (email, name, uid) => {
 
  token = await firebase.auth().currentUser.getIdToken()
  body = {
      email: email,
      name: name,
      firebase_uid: uid
  }
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  data = {
    email: email,
    name: name,
    firebase_uid: uid
  }
 
  try{
      await api.post('/register', data, config)
  }catch ( error ) {
    console.log(error.message)
  }
}
