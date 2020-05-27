import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Layout,
  Button,
  Input,
} from '@ui-kitten/components';
import api from '../../api'
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
 import { getData } from '../../memoryAccess/getData';
import { ScrollView, StyleSheet } from "react-native";
import ErrorMessage from '../../components/ErrorMessage';
import React, { Fragment } from "react";

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
  cpf: Yup.string()
    .matches('[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}', 'O numero de CPF não é segue o formato xxx.xxx.xxx-xx'),
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

class EditUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cpf: '',
          email: '',
          name: 'userName',
          phone: '',
          address: [],
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
      changeAdress = (index) => {
        this.props.navigation.navigate('DetailChange')
      };
    
      renderItemAccessory = (style) => (
        <Ionicons name="md-create" size={30} color="black" />
      );
    
    render(){
        return (
            <ScrollView>
              <Layout style = {styles.container}>
                <Formik
                  onChange={() => console.log("mudou")}
                  enableReinitialize
                  initialValues={{
                    name: name,
                    cpf: cpf,
                    email: email,
                    // phone: phone,
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
                        onChangeText={handleChange('cpf')}
                        caption={'Formato: xxx.xxx.xxx-xx'}
                        placeholder='CPF'
                        autoCapitalize='none'
                        onBlur={handleBlur('cpf')}
                      />
                      <ErrorMessage errorValue={touched.cpf && errors.cpf} />
                      <Input
                        name='email'
                        value={values.email}
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
                        onChangeText={handleChange('phone')}
                        caption={'Formato: (xx) 9xxxx-xxxx'}
                        placeholder='Telefone'
                        autoCapitalize='none'
                        onBlur={handleBlur('phone')}
                      />
                      <ErrorMessage errorValue={touched.phone && errors.phone} /> */}
                      
                      {/* <Select
                        style={styles.select}
                        data={genderList}
                        placeholder='Gender'
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                      /> */}
                    {/* <Layout style = {{width: '100%', marginTop: 28}} >
                      <ListItem
                        title={'Endereço'}
                        // description={ this.address.streat == '' ? `${this.state.address.streat}, ${this.state.address.streat} - ${this.state.address.city}` : 'Clique para completar'}
                        description={'Clique para detalhes de endereço'}
                        style = {{backgroundColor: '#f8f9fd', borderColor: 'black', borderRadius: 4}}
                        accessory={renderItemAccessory}
                        status = 'primary'
                        onPress={() => this.changeAdress()}
                      />
                    </Layout> */}
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

export const EditUser = withNavigation(EditUserProfile)

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
    