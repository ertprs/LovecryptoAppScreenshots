//Importações Externas
import storage from '@react-native-firebase/storage';
 
export const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};
  
export const uploadProgress = ratio => Math.round(ratio * 100);
 
export const createStorageReferenceToFile = response => {
  const { fileName } = response;
  return storage().ref(fileName);
};
 
export const updateProfilePic = (file) => {
  const fileSource = getFileLocalPath(file);
  const storageRef = createStorageReferenceToFile(file);
  return storageRef.putFile(fileSource)
}