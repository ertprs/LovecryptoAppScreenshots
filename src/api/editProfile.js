import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const editProfile = async (name, interests, phone, birthday, gender, cpf, address) => {
    user = await auth().currentUser
    token = user.getIdToken()
    config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    user.updateProfile({
        displayName: name,
    })

    let data = {
        name: name, 
        address: address,
        interests: interests,
        phone: phone,
        birthday: birthday,
        gender: gender,
        cpf: cpf,
    }
      console.log('Editar 4 ' + JSON.stringify(data))
    try{
        await api.post('/user/update', data, config)
    }catch ( error ) {
        console.log(error.message)
    }
  }