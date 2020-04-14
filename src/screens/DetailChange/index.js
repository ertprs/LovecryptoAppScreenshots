import React, { Fragment, Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  List,
  ListItem,
  Layout,
  Button,
  Input,

} from 'react-native-ui-kitten';
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
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


import * as Yup from 'yup';
import ErrorMessage from '../../components/ErrorMenssage';
import api from '../../config/api'


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
  // console.log('Dados ' + JSON.parse(usuario))
  return JSON.parse(usuario)
}

export class DetailChangeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      altered: false,
      streat: ' ',
      number: 0,
      cep: ' ',
      city: ' ',
    };
  }

  componentWillMount(){
     getUser().then(data => {
      console.log('Detalhe: '+ JSON.stringify(data) )

      console.log('Detalhe: '+ JSON.stringify(data.address.number) )

      this.setState({ 
        altered: false,
        streat: data.address.streat,
        number:  data.address.streat,
        cep:  data.address.streat,
        city: data.address.streat,
      })

    
    });

    
    
  }
  
  changeAdress = (index) => {
    this.props.navigation.navigate('DetailChange')
  };

  render() {

    const renderItemAccessory = (style) => (
      <Ionicons name="md-create" size={30} color="black" />
    );

    return (
      <ScrollView>
        <Layout style = {styles.container}>
          <Formik
            onChange={() => console.log("mudou")}
            enableReinitialize
            initialValues={{
              streat: this.state.streat,
              number: this.state.number,
              cep: this.state.cep,
              city: this.state.city,
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
}
 