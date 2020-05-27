import * as Yup from 'yup';
import { Formik } from "formik";
import * as firebase from "firebase";
import api from '../../../api';
import React, { Fragment }  from "react";
import ErrorMessage from '../../ErrorMessage';
import { View,  StyleSheet, SafeAreaView} from "react-native";
import { Button, Input, Layout, Spinner, Text, CheckBox} from '@ui-kitten/components';
 

import  { registerApi }   from '../../../api/signup'
import { loginApi }   from '../../../api/login'

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

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size='small'/>
  </View>
);

// const getToken = async () => {
//   token = await firebase.auth().currentUser.getIdToken().then(res => {
//     return res
//   })
//   return await token
// }

// const loginApi = async () => {
//   console.log('4  -------------------')
//   token = await getToken()
//   config = {
//     headers: { Authorization: `Bearer ${token}` }
//   }
//   try{
//       await api.get('/auth', config).then( response => { 
//         let userData = response.data.user_data;
//         // console.log(userData.address)
//         saveData('@userData', userData)
//     });
//   }catch ( error ) {
//     console.log(error.message)
//   }
// }

// const registerApi = async (email, name, uid) => {
//   // console.log('3 ' + email + ' ' + name + ' ' + uid)
//   token = await getToken()
//   body = {
//       email: email,
//       name: name,
//       firebase_uid: uid
//   }
//   config = {
//     headers: { Authorization: `Bearer ${token}` }
//   }
//   data = {
//     email: email,
//     name: name,
//     firebase_uid: uid
//   }

//   // console.log('Header ' + config)
//   // console.log('Data ' + data)
  
//   try{
//       await api.post('/register', data, config)
//   }catch ( error ) {
//     console.log(error.message)
//   }
// }

//Componente para login/signup com email
export const Signup = props => {
  const [checked, setChecked] = React.useState(false);
  const [haveError, setHaveError] = React.useState(false);
  
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  const signup = async (email, name, password) => {
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
      
        registerApi(email, name, res.user.uid).then(response => {
          loginApi()
        })
 
        return res
      })
      .catch(error => {
        console.log(error);
        if(error.message == 'The email address is already in use by another account.'){
          setHaveError(true)
        }
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
                // style = {styles.checkBox}
                checked={checked}
                status='success'
                onChange={onCheckedChange}
              >
                
              </CheckBox>
              <Text category='c1' status='control'>Concordo com os termos e condições</Text>
            </Layout>
            <Layout style = {styles.buttonRow} >
            <ErrorMessage status = {'auth'}  errorValue={haveError && 'Esta credencial já pertence à alguma conta cadastrada'} />
              <Button 
                onPress={handleSubmit} 
                status='success'
                disabled={ isSubmitting || !isValid || !checked}
                // accessoryLeft={LoadingIndicator}
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
    // paddingTop: 8,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input:{
    paddingTop: 8,
  },
  buttonRow:{
    paddingTop: 32,
    backgroundColor: 'transparent',
  },
  // checkBox:{
  //   paddingTop: 8,
  // },
  container:{
    width: '100%'
  }
});
