import { api } from './'
import auth from '@react-native-firebase/auth';

export const getGenderList = async () => {
    genderList = null
    token = await auth().currentUser.getIdToken();
    config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try{
        await api.get('/core/genders', config).then( response => {
        genderList = response.data 
    });
    }catch ( error ) {
    console.log(error.message)
    }
    return genderList
  }