//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import auth from '@react-native-firebase/auth';
import React, { Fragment, useState }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback, } from "react-native";
import { Button, Input, Layout, Icon, Text, CheckBox, } from '@ui-kitten/components';
import { loginStart, loginFailure, loginSuccess, signUpStart, signUpSuccess, signUpFailure } from '../../../store/actions/auth'
 
//Importações Internas
import { loginApi } from '../../../api/login';
import ErrorMessage from '../../errormenssage';
import { registerApi } from '../../../api/signup';
import { setUser } from '../../../store/actions/user';
import LoadingIndicator from '../../../shared/loadingIcon';
  
//Regras de validação
export const validationSchema = Yup.object().shape({
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
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(10, 'A senha deve ter no máximo 10 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'A confirmação deve coincidir com a senha')
    .required('A confirmação é obrigatória')
})
 
//Componente para signup com email
export const Signup = () => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [messageError, setMessageError] = useState(null);

  const authState = useSelector(state => state.authState);

  const MailIcon = (props) => (
    <Icon {...props} name='email'/>
  );
  
  const PersonIcon = (props) => (
    <Icon {...props} name='person'/>
  );
  
  //Hide text do password
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const togglePasswordSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={togglePasswordSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  //Hide text do confirm password
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = React.useState(true);

  const toggleConfirmSecureEntry = () => {
    setSecureConfirmTextEntry(!secureConfirmTextEntry);
  };

  const renderConfirmIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleConfirmSecureEntry}>
      <Icon {...props} name={secureConfirmTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const signup = async (email, name, password) => {
    dispatch(signUpStart('EMAIL'))
    //Iniciando Signup No Firebase
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then( res => {
      //Iniciando Signup Na API
      registerApi(email, name, res.user.uid, authState.referedBy).then(async()=> {
        dispatch(signUpSuccess())
        //Iniciando Login na API
        dispatch(loginStart('EMAIL'))
        auth().currentUser.sendEmailVerification()
        try{
          const response = await loginApi()
          const userAPI = response.data.user_data;
          dispatch(loginSuccess())
          dispatch(setUser(user))
          dispatch(setUserPhoto(auth().currentUser.photoURL))
          auth().currentUser.sendEmailVerification()
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
          setHaveError(true)
          setMessageError(error.message)
        }
        //Final login API
      }).catch(error => {
        dispatch(signUpFailure(error.message))
        console.log('ERRO DE SIGNUP ' + error.message)
      })
      //Final Signup na API
    })
    .catch(error => {
      console.log(error.message);
      dispatch(signUpFailure(error.message))
      setHaveError(true)
      setMessageError(error.message)
    });
  }; 
  
  return (
    <Fragment>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={(values, {setSubmitting, resetForm})=> {
          const { name, email, password } = values;
          signup(email, name, password).then( () => {
            resetForm({name: '', email: '', password: '', confirmPassword: ''})
          })
          setChecked(false)
          setSubmitting(false);
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
              caption={ () => <ErrorMessage errorValue={touched.name && errors.name}/> }
              accessoryRight ={ PersonIcon}
              style = {styles.input}
            />
            <Input
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Email'
              autoCapitalize='none'
              onBlur={handleBlur('email')}
              caption={ () => <ErrorMessage errorValue={touched.email && errors.email}/>} 
              accessoryRight={MailIcon}
              style = {styles.input}
            />
            <Input
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Senha'
              accessoryRight={renderPasswordIcon}
              secureTextEntry={secureTextEntry}
              onBlur={handleBlur('password')}
              caption={ () => <ErrorMessage errorValue={touched.password && errors.password} />} 
              style = {styles.input}
            />
            <Input
              name='password'
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder='Confirmação de senha'
              accessoryRight={renderConfirmIcon}
              secureTextEntry={secureConfirmTextEntry}
              onBlur={handleBlur('confirmPassword')}
              style = {styles.input}
            />
            <ErrorMessage visible = {touched.confirmPassword} errorValue={errors.confirmPassword}/>
            <Layout style = {styles.section} >
              <CheckBox
                checked={checked}
                status='success'
                onChange={onCheckedChange}
              >
                <Text category='c1' status='control'>Concordo com os termos e condições</Text> 
              </CheckBox>
            </Layout>
            <Layout style = {styles.buttonRow}>
              { haveError && 
                <ErrorMessage status = {'auth'}  errorValue={messageError} />
              }
              <Button 
                onPress={handleSubmit} 
                status='success'
                disabled={ isSubmitting || !isValid || !checked}
                accessoryLeft={ isSubmitting && LoadingIndicator  }
                >Cadastro</Button>
              </Layout>
          </Fragment>
        )}
        </Formik>
    </Fragment>
  );
};

const styles = StyleSheet.create({  
  section: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  input:{
    marginTop: 16,
  },
  buttonRow:{
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 24,
  },
});
