import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import ErrorMessage from './errormenssage';
import { StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { saveData } from '../memoryAccess/saveData'
import { LoadingIndicator } from '../shared/loadingIcon'
 
//Regras de validação
const validationSchema = Yup.object().shape({
  account: Yup.string()
    .label('agency')
    .required('Este campo deve ser preenchido')
    .min(4, 'O hash deve ter 10 dígitos')
    .max(6, 'O hash deve ter 10 dígitos'),
  agency: Yup.string()
    .label('account')
    .required('Este campo deve ser preenchido')
    .min(4, 'O hash deve ter 10 dígitos')
    .max(6, 'O hash deve ter 10 dígitos'),
 
})
 
//Componente para login/signup com email
export const AddAccountBank = (props) => {

  const dispatch = useDispatch();
  const wallet = useSelector(state => state.withdrawState);
 
  const saveBankAccount = async (agency, account) => {

    const acc =  { name: 'Bank Account', code: null, type: 'fiat',  hash: null, agency: agency, account: account,}
    
    saveData('@bankAcount', acc) 
  };

  return (
    <Layout style={{width: '100%'}}>
      <Text style = {{marginBottom: 32, textAlign: 'center'}}>Insira os dados da sua conta bancaria</Text>
      <Formik
        initialValues={{
          agency: '',
          account: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { agency, account } = values;
          saveBankAccount(agency, account).then( () => {
            resetForm({agency: '', account: ''})
            setSubmitting(false);
            props.navigation.navigate('Requestwithdraw', {type: 'fiat'})
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
              name='agency'
              value={values.agency}
              onChangeText={handleChange('agency')}
              placeholder='Agencia'
              onBlur={handleBlur('agency')}
              size = 'large'
              autoFocus
            />
            <ErrorMessage status = 'hint' errorValue={touched.agency && errors.agency} />
            <Input
              name='account'
              value={values.account}
              onChangeText={handleChange('account')}
              placeholder='Conta'
              onBlur={handleBlur('account')}
              size = 'large'
              autoFocus
            />
            <ErrorMessage status = 'hint' errorValue={touched.account && errors.account} />
            
            <Layout style = {{paddingTop: 64,}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                >Cadastro</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </Layout>
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
  
  container:{
    width: '100%'
  }
});
