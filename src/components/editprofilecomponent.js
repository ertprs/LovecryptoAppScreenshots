//Importações Externas
import {
  Button,
  Input,
  Layout,
  Datepicker,
  Icon,
  NativeDateService 
} from '@ui-kitten/components';
import * as Yup from 'yup';
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import React, { Fragment } from "react";
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
//Importações Internas
import ErrorMessage from './errormenssage';
import { editProfile } from '../api/editProfile';
import { LoadingIndicator } from '../shared/loadingIcon';
import { updateUserCPF, updateUserPhone, updateUserAddress } from '../store/actions/user'


const dateService = new MomentDateService();

//Regras de validação
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Por favor insira um email'),
  phone: Yup.string()
  .matches('[0-9]{11}', 'Insira apenas os digitos, sem pontos e traços'),
  cpf: Yup.string()
    .matches('[0-9]{11}', 'Insira apenas os digitos, sem pontos e traços'),
  streat: Yup.string()
    .label('street')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cep: Yup.string()
  .matches('[0-9]{8}', 'Insira apenas os digitos, sem pontos e traços'),
  city: Yup.string()
    .label('city')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  number: Yup.number()
})

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);
 
// const formatDateService = new NativeDateService('en', { format: 'DD.MM.YYYY' });

export const EditProfileComponent = (props) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userState);
  // const [date, setDate] = React.useState(moment());
  // const bDate = moment("08/12/1920");
  // const eDate = moment("08/12/2010");

  return (
    <Layout style = {styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          phone: user.phone,
          city: user.address.city,
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          let address = {
            cep: "", 
            city: values.city, 
            number: "", 
            streat: ""
          }
 
          editProfile(values.name, [], values.phone, '', null, values.cpf, address).then( () => {
            setSubmitting(false);
            dispatch(updateUserAddress(address))
            dispatch(updateUserCPF(values.cpf))
            dispatch(updateUserPhone(values.phone))
            resetForm({name: values.name, cpf: user.cpf, email: user.email, phone: user.phone, city: user.address.city})
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
            label='name'
            name='name'
            value={values.name}
            onChangeText={handleChange('name')}
            disabled={true}
            placeholder='Nome'
            autoCapitalize='none'
            onBlur={handleBlur('name')}
            caption = {<ErrorMessage errorValue={touched.name && errors.name} />}
          />
          <Input
            label='CPF'
            name='cpf'
            value={values.cpf}
            onChangeText={handleChange('cpf')}
            caption={'Formato: xxx.xxx.xxx-xx'}
            placeholder='CPF'
            autoCapitalize='none'
            onBlur={handleBlur('cpf')}
            caption = {<ErrorMessage errorValue={touched.cpf && errors.cpf} />}
          />
          <Input
            label='Email'
            name='email'
            value={values.email}
            onChangeText={handleChange('email')}
            disabled={true}
            placeholder='Email'
            autoCapitalize='none'
            onBlur={handleBlur('email')}
            caption = {<ErrorMessage errorValue={touched.email && errors.email}/>}
          />
          <Input
            label='Telefone'
            name='phone'
            value={values.phone}
            onChangeText={handleChange('phone')}
            placeholder='Telefone'
            autoCapitalize='none'
            onBlur={handleBlur('phone')}
            caption={<ErrorMessage errorValue={touched.phone && errors.phone} />}
          />
           
           {/* <Datepicker
            label='Data de Nascimento'
            placeholder='Ex: 15/10/1980'
            date={date}
            min = {bDate}
            max = {date}
            dateService={dateService}
            onSelect={nextDate => setDate(nextDate)}
            accessoryRight={CalendarIcon}
            style = {{marginBottom: 16}}
          /> */}

          <Input
            label='Cidade'
            name='city'
            value={values.city}
            onChangeText={handleChange('city')}
            placeholder='Cidade'
            autoCapitalize='none'
            onBlur={handleBlur('city')}
            caption = {<ErrorMessage errorValue={touched.city && errors.city}/>}
          />
          <Layout style = {{paddingTop: 48}} >
            <Button
              onPress={handleSubmit}
              status='success'
              // disabled={ isSubmitting || !isValid }
              accessoryLeft={isSubmitting ? LoadingIndicator : null}
              >Editar</Button>
          </Layout>
        </Fragment>
        )}
      </Formik>
    </Layout>
  );
}
 
const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 16,
      paddingHorizontal: 16,
    }, 
  });
    