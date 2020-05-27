import React, { Fragment, useState, useEffect} from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Layout,
  Button,
  Input,
} from '@ui-kitten/components'
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage';
import api from '../../api'

//Regras de validação
const validationSchema = Yup.object().shape({
  streat: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  number: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Valor inválido'),
  cep: Yup.string()
    .matches('^\d{5}-\d{3}$', 'O numero de cep não é valido')
    .required('Por favor insira um cep válido'),
  city: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  })

const getUser = async () => {
  let usuario = null;
  try {
    usuario = await AsyncStorage.getItem('user') || 'none';
  } catch (error) {
    console.log(error.message);
  } 
  return JSON.parse(usuario)
}

export const DetailChangeScreen = (props) => {
  const [altered, setAltered] = useState(false)
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState(0)
  const [cep, setCep] = useState('')
  const [city, setCity] = useState('')
  
  useEffect(() =>{
    getUser().then(data => {
      setAltered(false),
      setStreet(data.address.streat),
      setNumber(data.address.streat),
      setCep(data.address.streat),
      setCity(data.address.streat)
    });
  })
 
  changeAdress = (index) => {
    props.navigation.navigate('DetailChange')
  };
 
  return (
    <ScrollView>
      <Layout style = {styles.container}>
        <Formik
          onChange={() => console.log("mudou")}
          enableReinitialize
          initialValues={{
            streat: streat,
            number: number,
            cep: cep,
            city: city,
          }}
          onSubmit={values => {
            //this.handleSubmit(values)
            const { name, cpf, phone, email } = values;
            // login(email, password);
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
                name='streat'
                value={values.streat}
                onChangeText={handleChange('namstreate')}
                placeholder='Rua'
                autoCapitalize='none'
                onBlur={handleBlur('streat')}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <Input
                name='cpf'
                value={values.number}
                onChangeText={handleChange('cpf')}
                placeholder='CPF'
                autoCapitalize='none'
                onBlur={handleBlur('cpf')}
              />
              <ErrorMessage errorValue={touched.cpf && errors.cpf} />
              <Input
                name='cep'
                value={values.cep}
                onChangeText={handleChange('cep')}
                placeholder='CEP'
                autoCapitalize='none'
                onBlur={handleBlur('cep')}
              />
              <ErrorMessage errorValue={touched.cep && errors.cep} />
              <Input
                name='city'
                value={values.city}
                onChangeText={handleChange('city')}
                placeholder='Cidade'
                autoCapitalize='none'
                onBlur={handleBlur('city')}
              />
              <ErrorMessage errorValue={touched.city && errors.city} />
              <Layout style = {styles.buttonRow} >
                <Button 
                  onPress={handleSubmit} 
                  status='success'
                  disabled={ isSubmitting || !isValid }
                >Editar</Button>
            </Layout>
          </Fragment>
          )}
        </Formik>          
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  text:{
    color : '#7A05C8'
  },
  buttonRow:{
    marginTop: 48,
  }
});
