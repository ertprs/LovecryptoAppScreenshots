import React, { Fragment, useState, useEffect} from "react";
import { View, StyleSheet, AsyncStorage, ImageBackground , Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Layout,
  Button,
  Input,
  Text
} from '@ui-kitten/components'
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage';
import api from '../../api'

//Regras de validação
const validationSchema = Yup.object().shape({
  actualPassword: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  newPassword: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Valor inválido'),
  confirmPassword: Yup.string()
    .matches('^\d{5}-\d{3}$', 'O numero de cep não é valido')
    .required('Por favor insira um cep válido'),

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

// export const ChangePasswordScreen = (props) => {
 
export class ChangePasswordScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      actualPassword: '',
      newPassword:'',
      confirmPassword:'',
    };
  }

  async componentDidMount(){
    user = await getData('@userData')
    this.setState({ 
       
    })
  
  }

  render(){

  
  return (
     // <Layout style = {styles.container}>
        
      //   {/* //<Layout style = {styles.card}>   */}
      //     <Layout style = {{marginTop: 18, width: 70, height: 70, borderRadius: 35, backgroundColor: '#B853FB', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
      //       <Layout style = {{width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
      //         <Avatar
      //         size='giant'
      //         source={ require('../../assets/images/avatar.png')}
      //       />
      //       </Layout>             
      //     </Layout>
      //     <Layout style = {{ backgroundColor: 'transparent', marginTop: 8, alignItems: 'center'}}>
      //       <Text style = {styles.text}category='h6' status = 'control' >{this.state.name}</Text>
      //       <Text style = {styles.text}appearance='hint' status = 'control' category='p1'>ID {this.state.id}</Text>
      //     </Layout>
      //     <Layout style = {styles.actionButton}>
      //        <Button  disabled = {false} style={styles.button} status='control' appearance='outline' onPress={() => this.link()} >Mais Detalhes</Button>
      //      </Layout>
      //   {/* </Layout> */}
        
      // </Layout> <
      <ScrollView>
   
      <ImageBackground source={require('../../assets/images/wallet_bg.png')} style={styles.backgroundImg}>
        {/* <Layout style = {styles.content}>
          <Layout style = {styles.info}>
            <Layout style = {{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row'}}>
              <Text category='h1' status='control' style = {styles.value}>{ this.state.value } </Text>
              <Text category='h3' status='control' style = {styles.currency}>{ this.state.currency } </Text>
            </Layout>
            <Layout style = {{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', marginTop: 8}}>
              <Text category='c2' status='control' style = {styles.text}>Sua pontuação</Text> 
            </Layout>
          </Layout>
        </Layout> */}
      </ImageBackground>
     

  
      <Layout style = { styles.card}>
        {/* <Avatar
          size='giant'

          source={ require('../../assets/images/avatar.png')}
        />
        */}
        <Formik
          onChange={() => console.log("mudou")}
          enableReinitialize
          initialValues={{
            actualPassword: this.state.actualPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
          }}
          onSubmit={values => {
            // this.editApi([], values.phone, '', null, values.cpf, address)
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
                name='Senha Atual'
                value={values.name}
                style = {styles.field}
                // disabled={true}
                onChangeText={handleChange('name')}
                placeholder='Senha Atual'
                autoCapitalize='none'
                onBlur={handleBlur('name')}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <Input
                name='Nova Senha'
                value={values.cpf}
                style = {styles.field}
                onChangeText={handleChange('cpf')}
                // caption={'Formato: xxx.xxx.xxx-xx'}
                placeholder='Nova Senha'
                autoCapitalize='none'
                onBlur={handleBlur('cpf')}
              />
              <ErrorMessage errorValue={touched.cpf && errors.cpf} />
              <Input
                name='Confirmar'
                value={values.email}
                style = {styles.field}
                onChangeText={handleChange('email')}
                // disabled={true}
                placeholder='Confirmar'
                autoCapitalize='none'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
            
              
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
{/* <ProfileOption route ='Legal' title = 'Legal' icon = 'file-text-outline' navigation = {this.props.navigation}/> */}
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
      
  
    {/* <TouchableNativeFeedback  style = {{ borderRadius: 10}}background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => console.log('clicou')}>
    
      <Layout style = {{ width: '100%', padding: 16, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', backgroundColor: '#F7F9FC', borderRadius: 10}}>
    
      <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
        <Icon fill='#222B45' style = {{height: 24, width: 24}} name='facebook-outline'/>
        <Text category = 'p1' style = {{ marginLeft: 10, marginTop: 3 }}>Teste</Text>
      </Layout>
      <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name='arrow-ios-forward-outline'/>
       </Layout>
       </TouchableNativeFeedback> */}
        
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
    // borderWidth: 1,
    // borderColor: 'black', 
    borderRadius: 10, 
    justifyContent: 'space-around',
    top: -130,
    alignItems: 'center',
    maxHeight: 600,
   
   
    // backgroundColor: 'yellow'
  },

  value:{
    // paddingTop: 8,
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
    height: 200,
    // marginTop: 25,
  },
  buttonRow:{
    width: '100%',
    // paddingBottom: 16,
    marginTop: 40,
    backgroundColor: 'transparent',
  }
});