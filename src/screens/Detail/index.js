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
  name: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Por favor insira um email'),
  phone: Yup.string()
    .matches('^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$', 'O numero não é valido')
    .required('Por favor insira um telefone válido'),
  cpf: Yup.string()
    .matches('[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}', 'O numero de CPF não é valido')
    .required('Não deve ficar em branco')
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

export class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      altered: false,
      cpf: '000.000.000-00',
      email: 'johndoe@mail.com',
      name: 'john doe',
      phone: '99 99999 9999',
      address: 'rua dos bobos, 0, Recife, Brazil',
      // drawerData:[
      //   { title: 'Nome de Preferencia', data: 'Lucas', fieldName: 'name'},
      //   { title: 'Email', data: 'lzsd@cin.ufpe.br', fieldName: 'email'}, 
      //   { title: 'Telefone', data: '(81) 99544-0402', fieldName: 'phone'},
      //   { title: 'Cidade', data: 'Recife', fieldName: 'address'},
      //   { title: 'Senha', data: '********', fieldName: 'password'},  
      //   ]
    };
  }

  componentWillMount(){
     getUser().then(data => {
      console.log('Detalhe: '+ JSON.stringify(data) )

      console.log('Detalhe: '+ JSON.stringify(data.address.number) )

      this.setState({ 
        altered: false,
        cpf: data.cpf,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
      })

      endereco =data.address
      console.log('Rua' + endereco.number)
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
              name: this.state.name,
              cpf: this.state.cpf,
              email: this.state.email,
              phone: this.state.phone,
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
                  name='Name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder='Nome'
                  autoCapitalize='none'
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <Input
                  name='cpf'
                  value={values.cpf}
                  onChangeText={handleChange('cpf')}
                  placeholder='CPF'
                  autoCapitalize='none'
                  onBlur={handleBlur('cpf')}
                />
                <ErrorMessage errorValue={touched.cpf && errors.cpf} />
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
                  name='phone'
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder='Telefone'
                  autoCapitalize='none'
                  onBlur={handleBlur('phone')}
                />
                <ErrorMessage errorValue={touched.phone && errors.phone} />
              
                
              <Layout style = {{width: '100%'}} >
                <ListItem
                  title={'Endereço'}
                  // description={ this.address.streat == '' ? `${this.state.address.streat}, ${this.state.address.streat} - ${this.state.address.city}` : 'Clique para completar'}
                  description={'Clique para detalhes de endereço'}
                  style = {{backgroundColor: '#f8f9fd', borderColor: 'black', borderRadius: 4}}
                  accessory={renderItemAccessory}
                  status = 'primary'
                  onPress={() => this.changeAdress()}
                />
              </Layout>

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
 