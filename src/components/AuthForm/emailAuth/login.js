import * as Yup from 'yup';
import { Formik } from "formik";
import * as firebase from "firebase";
import React, { Fragment }  from "react";
import ErrorMessage from '../../ErrorMessage';
// import  { loginApi }  from '../../../api/login';
import {  StyleSheet, SafeAreaView} from "react-native";
import { Button, Input, Layout} from '@ui-kitten/components';


//Regras de validação
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Insira um email registrado'),
  password: Yup.string()
    .label('Password')
    .required('Este campo é obrigatório')
    .min(6, 'A senha deve ter pelo 6 caracteres '),
})
 

 const loginApi = async () => {
  token =  await firebase.auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
 
  try{
   
      await api.get('/auth', config).then( response => { 
    
        let userData = response.data.user_data;
        saveData('@userData', userData)
        initialConfig()
    });
  }catch ( error ) {
    console.log(error.message)
  }
}


//Componente para login/signup com email
export const Login = (props) => {

  const [haveError, setHaveError] = React.useState(false);

  const login = async (email, password) => {
    response = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('1  ')
        loginApi().then(() =>{
          return res
        })
      })
      .catch(error => {
        console.log(error.message);
        if(error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.' || error.message == 'The password is invalid or the user does not have a password.'){
          setHaveError(true)
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          const { email, password } = values;
          login(email, password);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting
        }) => (
          <Fragment>
            <Input
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Email'
              autoCapitalize='none'
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <Input
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Senha'
              secureTextEntry
              onBlur={handleBlur('password')}
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <Layout style = {styles.buttonRow} >
              <ErrorMessage status = {'auth'}  errorValue={haveError && 'Você não tem conta ou a credencial está errada'} />
              <Button 
                onPress={handleSubmit} 
                status='success'
                disabled={ isSubmitting || !isValid }
              >Login</Button>
            </Layout>
        </Fragment>
        )}
      </Formik>
      <Layout style = {styles.section}>
        <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('ForgotPassword')} status='control'>Esqueceu sua senha?</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  
  section: {
    paddingTop: 16,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  input:{
    paddingTop: 8,
  },
  buttonRow:{
    paddingTop: 32,
    backgroundColor: 'transparent',
    width: '100%',
  },
  checkBox:{
    paddingTop: 8,
  },
  container:{
    width: '100%'
  }
});
