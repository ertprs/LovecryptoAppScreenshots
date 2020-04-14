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
  name: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Por favor insira um email'),
  password: Yup.string()
    .label('Password')
    .required('Este campo é obrigatório')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'A confirmação deve coincidir com a senha')
    .required('A confirmação é obrigatória')
})

const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
      console.log(error.message);
  }
}

const getUser = async () => {
  try {
    usuario = await AsyncStorage.getItem('user') || 'none';
  } catch (error) {
    console.log(error.message);
  } 
  return usuario
}

//Recupera o token da memória
const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
       return res
  })
  return await token
}

const registerApi = async (email, name, uid) => {
  token = await getToken();
  body = {
      email: email,
      name: name,
      firebase_uid: uid
  }
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try{
      await api.post('/register',{
        email: email,
        name: name,
        firebase_uid: uid
      } , config).then( response => {
    });
  }catch ( error ) {
    console.log(error.message)
  }
}

//Componente para login/signup com email
export const Signup = props => {
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const signup = async (email, name, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        registerApi(email, name, res.uid)
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
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={values => {
          //this.handleSubmit(values)
          const { name, email, password } = values;
          signup(email, name, password) 
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
              name='name'
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder='Nome'
              onBlur={handleBlur('name')}
              autoFocus
            />
            <ErrorMessage errorValue={touched.name && errors.name} />
            
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
          
            <Input
              name='password'
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder='Confirmação de senha'
              secureTextEntry
              onBlur={handleBlur('confirmPassword')}
            />
            <ErrorMessage
              errorValue={touched.confirmPassword && errors.confirmPassword}
            />
            <Layout style = {styles.section} >
              <CheckBox
                style = {styles.checkBox}
                text={'Concordo com os termos e condições'}
                textStyle={{color:'white', fontSize: 14}}
                checked={checked}
                status='success'
                onChange={onCheckedChange}
              />
            </Layout>
            <Layout style = {styles.buttonRow} >
                <Button 
                  onPress={handleSubmit} 
                  status='success'
                  disabled={ isSubmitting || !isValid || !checked}
                  >Cadastro</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
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
