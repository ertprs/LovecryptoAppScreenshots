import React, { Fragment }  from "react";
import * as firebase from "firebase";
import {  StyleSheet, AsyncStorage, SafeAreaView} from "react-native";
import { Formik } from "formik";
import { Button, Input, Layout, Text, CheckBox} from 'react-native-ui-kitten';
import * as Yup from 'yup';
import ErrorMessage from '../../ErrorMenssage';
import api from '../../../config/api'

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

const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    return res
  })
  return await token
}

const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', user);
    
  } catch (error) {
      console.log(error.message);
  }
}

const getUser = async () => {
  // try {
  //   usuario = await AsyncStorage.getItem('user') || 'none';
  // } catch (error) {
  //   console.log(error.message);
  // } 
  // console.log(usuario + 'recuperado da memoria')
  // return usuario
}

const loginApi = async () => {
  token = await getToken();
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
      await api.get('/auth', config).then( response => { 
        console.log(JSON.stringify(response.data.user_data)) 
        saveUser(JSON.stringify(response.data.user_data))
    });
  }catch ( error ) {
    console.log(error.message)
  }
}
//Componente para login/signup com email
export const Login = (props) => {

  const login = async (email, password) => {
    response = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        //Salva o usuario no Async Storage
        //console.log(' Acess  ' + JSON.stringify(res))
        loginApi()
        return res
      })
      .catch(error => {
        console.log(error);
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
          //this.handleSubmit(values)
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
        <Button appearance='ghost' onPress = {() => console.log('Esqueceu a senha')} status='control'>Esqueceu sua senha?</Button>
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
  },
  checkBox:{
    paddingTop: 8,
  }
});
