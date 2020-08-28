//Importações Externas
import React, { useState } from 'react';
import { Layout, Button, Icon} from '@ui-kitten/components';
import { Image, TouchableWithoutFeedback }  from 'react-native';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import { setUserPhoto} from '../store/actions/user'
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePic, uploadProgress} from '../api/updateProfilePic'
  

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

export const EditProfilePhoto = () => {

  const dispatch = useDispatch()

    const [upload, setUpload] = useState({
      loading: false,
      progress: 0,
    });
      
    const [ selectedImage, setSelectedImage] = useState(null)
  
    const pickImageHandler = () => {
      ImagePicker.showImagePicker({title: 'Pick a Image', maxWidth: 800, maxHeight: 600},  (response) => {
             
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // console.log('Image ' + response.uri)
          // setSelectedImage({uri: response.uri})
          var uploadTask = updateProfilePic(response)
          // console.log('URL ' + JSON.stringify(url))
          uploadTask.on('state_changed', snapshot => {
            // Get the upload progress
            const progress = uploadProgress(
              snapshot.bytesTransferred / snapshot.totalBytes
            );
        
            switch (snapshot.state) {
              case 'running':
                setSelectedImage(null);
                // Set upload state to true and save progress into local state
                setUpload({ loading: true, progress });
                console.log('PR ' + upload.progress)
                break;
              case 'success':
                snapshot.ref.getDownloadURL().then(downloadURL => {
                  setSelectedImage(downloadURL);
                  setUpload({ loading: false });

                  auth().currentUser.updateProfile({
                    photoURL: downloadURL
                  })
                  dispatch(setUserPhoto(downloadURL))   
                });
                break;
              default:
                break;
            }
          });
        }
      });   
    }
 
    const user = useSelector(state => state.userState);
     
    return(
      <TouchableWithoutFeedback onPress = { () => pickImageHandler()}>
        <Layout style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', padding: 24}}>
          <Layout style = {{backgroundColor: '#ffffff66', margin: 16, borderRadius: 14}}>
            <Image style = {{height: 120, width: 120, borderRadius: 10, margin: 8}}  source={user.photoUrl == null ? require('../assets/images/avatar.png') : {uri : user.photoUrl}} />
            <Button onPress = { () => pickImageHandler()} size = 'small' style = {{position: 'absolute', right: -6, bottom: -6, borderRadius: 20, paddingHorizontal: 0}}  status='control' accessoryLeft={EditIcon}/>
          </Layout>
        </Layout>
      </TouchableWithoutFeedback>
      
    )
};
 