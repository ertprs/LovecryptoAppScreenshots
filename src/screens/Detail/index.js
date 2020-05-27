import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Layout,
  Button,
  Input,
} from '@ui-kitten/components';
import api from '../../api'
import * as firebase from "firebase";
import { getData } from '../../memoryAccess/getData';
import { ScrollView, StyleSheet, ImageBackground, Image } from "react-native";
import ErrorMessage from '../../components/ErrorMessage';
import React, { useState, Fragment, useEffect } from "react";
import { ProfileOption } from  '../../components/ProfileOption'

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
    .matches('^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$', 'O numero de não é segue o formato (xx)9xxxx-xxxx'),
    // .required('Por favor insira um telefone válido'),
  cpf: Yup.string()
    .matches('[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}', 'O numero de CPF não é segue o formato xxx.xxx.xxx-xx'),
    // .required('Não deve ficar em branco'),
  street: Yup.string()
  .label('street')
  .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cep: Yup.string()
  .label('cep')
  .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  city: Yup.string()
  .label('city')
  .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  number: Yup.string()
  .label('number')
  .min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

getGendersApi = async () => {
  token = await firebase.auth().currentUser.getIdToken();
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
    await api.get('/core/genders', config).then( response => {
    console.log(JSON.stringify(response.data))
    return (JSON.stringify(response.data))
    });
  }catch ( error ) {
    console.log(error.message)
  }
}

export class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      cpf: '',
      email: '',
      name: '',
      phone: '',
      birthday:'',
      gender:'',
      address: [],
      genderList: [],
      editAddress: false,
      id: 0
    };
  }
  
  async componentDidMount(){
    user = await getData('@userData')
    this.setState({ 
      cpf: user.cpf,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
    })  
  }

  editApi = async (interests, phone, birthday, gender, cpf, address) => {
    token = await firebase.auth().currentUser.getIdToken()
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    data =  { interests, phone, birthday, gender, cpf, address }

    try{
        await api.post('/user/update', data, config).then( response => {
          user.phone = phone;
          user.birthday = birthday;
          user.gender = gender;
          user.cpf = cpf;
          user.address = address;
          user.birthday = birthday;
          user.gender = genero;
          saveUser(user)
          console.log(user)
          console.log(response)
      });
    }catch ( error ) {
      console.log(error.message)
    }
  }

  render(){
    return (
      <ScrollView>
        <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
          <Image style = {{height: 100, width: 100, borderRadius: 50, top: -20}} source={require('../../assets/images/avatar.png')} />
        </ImageBackground>
        <Layout style = { styles.card}>
          <Formik
            onChange={() => console.log("mudou")}
            enableReinitialize
            initialValues={{
              name: this.state.name,
              cpf: this.state.cpf,
              email: this.state.email,
              // phone: this.state.phone,
            }}
            onSubmit={values => {
              this.editApi([], values.phone, '', null, values.cpf, address)
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
                  style = {styles.field}
                  disabled={true}
                  onChangeText={handleChange('name')}
                  placeholder='Nome'
                  autoCapitalize='none'
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <Input
                  name='cpf'
                  value={values.cpf}
                  style = {styles.field}
                  onChangeText={handleChange('cpf')}
                  // caption={'Formato: xxx.xxx.xxx-xx'}
                  placeholder='CPF'
                  autoCapitalize='none'
                  onBlur={handleBlur('cpf')}
                />
                <ErrorMessage errorValue={touched.cpf && errors.cpf} />
                <Input
                  name='email'
                  value={values.email}
                  style = {styles.field}
                  onChangeText={handleChange('email')}
                  disabled={true}
                  placeholder='Email'
                  autoCapitalize='none'
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                {/* <Input
                  name='phone'
                  value={values.phone}
                  style = {styles.field}
                  onChangeText={handleChange('phone')}
                  // caption={'Formato: (xx) 9xxxx-xxxx'}
                  placeholder='Telefone'
                  autoCapitalize='none'
                  onBlur={handleBlur('phone')}
                />
                <ErrorMessage errorValue={touched.phone && errors.phone} /> */}
        
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

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    paddingHorizontal: 32, 
    paddingVertical: 48, 
    margin: 16,
    marginBottom: 24,
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -80,
    alignItems: 'center',
    maxHeight: 600,
  },
  field:{
    marginTop: 16,
  },  
  currency:{
    paddingTop: 6,
  },
  info:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',    
  },
  content:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',    
    width: '100%',     
    paddingHorizontal: 48,
    marginVertical: 16,
  },
  topInfo:{
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    textAlignVertical: 'center'
  },  
  backgroundImg:{
    alignItems: 'center',
    justifyContent: 'center',   
    width: '100%',
    height: 250,
  },
  buttonRow:{
    width: '100%',
    marginTop: 40,
    backgroundColor: 'transparent',
  }



});
  