
const getUser = async () => {
    try {
      usuario = await AsyncStorage.getItem('user') || 'none';
    } catch (error) {
      console.log(error.message);
    } 
    console.log(usuario + 'recuperado da memoria')
    return usuario
}


