//Importações Externas
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { GoogleSignin } from '@react-native-community/google-signin';

//Importações Internas
import { loginApi } from '../../../api/login';
import { registerApi } from '../../../api/signup';
import { setUser, setUserPhoto} from '../../../store/actions/user';
import { loginStart, loginFailure, signUpFailure, loginSuccess, } from '../../../store/actions/auth';

const GoogleIcon = (props) => (
  <Icon {...props} name='google'/>
);

const FacebookIcon = (props) => (
  <Icon {...props} name='facebook'/>
);

export const SocialAuth = props => {
  
  useEffect(() => {
    //PROD
    GoogleSignin.configure({
      webClientId: '522049972574-5ihc6of012bi4330eqhrtl6552irea2t.apps.googleusercontent.com',
    });

    // //DEV
    // GoogleSignin.configure({
    //   webClientId: '940937104065-nos2p4h9o37hqq7l22m31r6ehsv1doj9.apps.googleusercontent.com',
    // });
}, []);
   
  const onPressFacebook = () => {
    dispatch(loginStart('Facebook'))
    LoginManager.logOut()
    LoginManager.logInWithPermissions([
      "public_profile",
      "email"
      ]).then(
        result => {
          if (result.isCancelled) {
            console.log("Login cancelado pelo usuário");
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(
                data.accessToken
              );
              auth()
                .signInWithCredential(credential)
                .then(result => {
                  var user = result.user;
                  console.log('USER ==>' + user)
                  registerApi(user.email, user.displayName, user.uid, authData.referedBy).then( async () => {
                    loginApi().then( response => {
                      dispatch(loginSuccess())
                      dispatch(setUser(response))
                      dispatch(setUserPhoto(user.photoURL))
                    })
                  })
                })
                .catch(error => {
                  console.log("Tente novamente " + error);
                  dispatch(loginFailure(error))
                });
            });
          }
        },
        error => {
          console.log("Erro ao logar com facebook " + error);
          dispatch(loginFailure(error))
        });
  };

  const onGoogleButtonPress = async () => {
    dispatch(loginStart('Google'))

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then( result =>{
      var user = result.user;
      registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
        auth().currentUser.sendEmailVerification()
        try{
          const response = await loginApi()
          var userAPI = response.data.user_data;
          dispatch(loginSuccess())
          dispatch(setUser(userAPI))
          dispatch(setUserPhoto(user.photoURL))
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
        }
      }).catch( async error => {
        if ( error == 'Error: Request failed with status code 400'){
          try{
            const response = await loginApi()
            var userAPI = response.data.user_data;
            dispatch(loginSuccess())
            dispatch(setUser(userAPI))
            dispatch(setUserPhoto(user.photoURL))
          }catch ( error ) {
            console.log('Login api error: ' + error.message)
            dispatch(loginFailure(error.message))
          }
        }else{
          console.log("Tente novamente " + error);
          dispatch(signUpFailure(error))
        }
      });
    }).catch(error => {
      console.log("Tente novamente " + error);
      dispatch(loginFailure(error))
    });
  }
   
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  
  return (
    <Layout style = {styles.container}>
      <Layout style = {{backgroundColor: 'transparent', paddingVertical: 12}}>
        <Text status = 'control' category = 'p1'>ou entre com</Text>
      </Layout>
      <Layout style = {{paddingVertical: 24, flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
        {/* <Layout style = {{flex: 1, paddingRight: 12, backgroundColor: 'transparent'}}>
          <Button style={[styles.button, {backgroundColor: '#3b5998', borderColor: '#3b5998'}]} status='info' accessoryLeft={FacebookIcon} onPress = {() => onFacebookButtonPress()}>
            Facebook
          </Button>
        </Layout> */}
        <Layout style = {{flex: 1, paddingLeft: 12, backgroundColor: 'transparent'}}>
          <Button style={[styles.button, ]} status='control' accessoryLeft={GoogleIcon}  onPress = {() => onGoogleButtonPress()}>
            Google
          </Button>
        </Layout>
      </Layout>
    </Layout>
     
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
