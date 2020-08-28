//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Button, Input, Layout, Icon} from '@ui-kitten/components';
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

//Importações Internas
import ErrorMessage from '../../errormenssage';
import { loginApi }  from '../../../api/login';
import { setUser } from '../../../store/actions/user';
import { LoadingIndicator } from '../../../shared/loadingIcon';
import { loginStart, loginFailure, loginSuccess, } from '../../../store/actions/auth';

//Regras de validação
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Insira um email registrado'),
  password: Yup.string()
    .label('Password')
    .required('Este campo é obrigatório')
    .min(6, 'A senha deve ter pelo 6 caracteres ')
    .max(10, 'A senha deve ter no máximo 10 caracteres'),
})

//Componente para login/signup com email
export const Login = (props) => {
  const dispatch = useDispatch();

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

  const MailIcon = (props) => (
    <Icon {...props} name='email'/>
  );
 
  const [haveError, setHaveError] = React.useState(false);
  const [messageError, setMessageError] = React.useState(null);
  
  const login = async (email, password) => {
    dispatch(loginStart('EMAIL'))
    auth()
    .signInWithEmailAndPassword(email, password)
    .then( ()=> {
      loginApi().then( response => {
        dispatch(loginSuccess())
        dispatch(setUser(response))
      })
    })
    .catch(error => {
      dispatch(loginFailure(error.message))
      setHaveError(true)
      setMessageError(error.message)
    }); 
  };


  return (
    <Fragment>    
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { email, password } = values;
          login(email, password).then( () => {
            resetForm({ email: '', password: ''})
          })
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
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Email'
              autoCapitalize='none'
              onBlur={handleBlur('email')}
              accessoryRight ={ MailIcon} 
              caption = { () =>  <ErrorMessage errorValue={ touched.email && errors.email}/>}
              style = {styles.input}
            />
            <Input
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Senha'
              onBlur={handleBlur('password')}
              accessoryRight={renderPasswordIcon}
              secureTextEntry={secureTextEntry}
              caption={() => <ErrorMessage errorValue={ touched.password && errors.password}/>} 
              style = {styles.input}
            />
            <Layout style = {styles.buttonRow}>
              { haveError && 
                <ErrorMessage status = {'auth'}  errorValue={messageError} />
              }
              <Button 
                onPress={handleSubmit} 
                status='success'
                appearance='filled'
                disabled={ isSubmitting || !isValid }
                accessoryLeft={ isSubmitting && LoadingIndicator }
              >Login</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
      <Layout style = {styles.section}>
        <Button appearance='ghost' onPress = {() =>  props.navigation.navigate('Forgot')} status='control'>Esqueceu sua senha?</Button>
      </Layout>
    </Fragment>
  );
};

const styles = StyleSheet.create({  
  section: {
     
    backgroundColor: 'transparent',
    margin: 24,
    alignItems: 'center'
  },
  buttonRow:{
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 48
  },
  input:{
    marginTop: 16,
  }
});
