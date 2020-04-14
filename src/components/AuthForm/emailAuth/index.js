import React, { Fragment }  from "react";
import * as firebase from "firebase";
import {  StyleSheet, AsyncStorage, SafeAreaView} from "react-native";
import { Formik } from "formik";
import { Button, Input, Layout, Text, CheckBox} from 'react-native-ui-kitten';
import * as Yup from 'yup';
import ErrorMessage from '../../ErrorMenssage';

//Regras de validação
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'Must have at least 3 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required')
})

//Componente para login/signup com email
export const EmailAuth = props => {
  const { isSignup } = props;
  const [checked, setChecked] = React.useState(false);
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  const login = (email, password) => {
    console.log('Login')
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {

        // async saveUser => {
        //   try {
        //     await AsyncStorage.setItem('user', res);
        //   } catch (error) {
        //      console.log(error.message);
        //   }
        // };
        // console.log(res)
        return res
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signup = (name, email, password) => {
    console.log('Cadastro')
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: name,    
        })
        // async saveUser => {
        //   try {
        //     await AsyncStorage.setItem('user', res);
        //   } catch (error) {
        //      console.log(error.message);
        //   }
        // };

        return res
      })
      .catch(error => {
        console.log(error);
      });
  };

  // handleSubmit = values => {
  //   if (values.email.length > 0 && values.password.length > 0) {
  //     setTimeout(() => {
  //       this.props.navigation.navigate('App')
  //     }, 3000)
  //   }
  // }

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
        isSignup ? signup(name, email, password) : login(email, password);
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
          { isSignup &&
          <Input
            name='name'
            value={values.name}
            onChangeText={handleChange('name')}
            placeholder='Nome'
            onBlur={handleBlur('name')}
            autoFocus
          />
          }
          { isSignup &&
          <ErrorMessage errorValue={touched.name && errors.name} />
          }
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
          { isSignup &&
          <Input
            name='password'
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder='Confirmação de senha'
            secureTextEntry
            onBlur={handleBlur('confirmPassword')}
          />
          }
          { isSignup && 
          <ErrorMessage
            errorValue={touched.confirmPassword && errors.confirmPassword}
          />
          }
          { isSignup &&
          <Layout style = {styles.section} >
            <CheckBox
              style = {styles.checkBox}
              text={'Concordo com os termos e condições'}
              checked={checked}
              status='success'
              onChange={onCheckedChange}
            />
          </Layout>
            }
          <Layout style = {styles.buttonRow} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                disabled={ isSubmitting || (isSignup && !checked)}
                >{isSignup ? 'Cadastro' : 'Login'}</Button>
         </Layout>
        </Fragment>

      )}
    </Formik>
    <Layout style = {styles.section}>
      <Button appearance='ghost' status='control'>Esqueceu sua senha?</Button>
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
    color: 'white',
  }
});
