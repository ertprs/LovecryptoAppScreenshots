import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import ErrorMessage from './errormenssage';
import { Button, Input, Layout, Text, Icon } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

import { showToast } from '../shared/showToast'
import { LoadingIndicator } from '../shared/loadingIcon'

//Regras de validação
const validationSchema = Yup.object().shape({
    email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Insira um email registrado'),
})
 
const MailIcon = (props) => (
    <Icon {...props} name='email'/>
);
 
//Componente para login/signup com email
export const RecoverPassword = ({navigation}) => {
  
  const recover = async (email) => {
    auth().sendPasswordResetEmail(email).then(() => {
      showToast('email de recuperação enviado para ' + email + '. Confira sua caixa de email e spam')
    }).catch(function(error) {
        console.log(error)
    });
  };

  return (
    <Layout style = {{width: '100%'}} >
      <Text style = {{marginBottom: 32, textAlign: 'center'}}>Insira seu email cadastrado</Text>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { email } = values;
          recover(email).then( () => {
            resetForm({email: ''})
            setSubmitting(false);
          }) 
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
              accessoryRight={MailIcon}  
              onBlur={handleBlur('email')}
              caption={ () => <ErrorMessage errorValue={touched.email && errors.email}/>} 
            />
            
            <Layout style = {{  marginTop: 64,}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                >Recuperar</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </Layout>
  );
};
 