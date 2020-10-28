import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment, useState }  from "react";
import ErrorMessage from './errormenssage';
import { StyleSheet } from "react-native";
import { Button, Input, Layout, Text, Icon, Modal, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { saveData } from '../memoryAccess/saveData'
import { LoadingIndicator } from '../shared/loadingIcon'
import { setFiatWallet } from '../store/actions/withdraw'
 //Importações Internas
import { generalStyle } from '../shared/generalStyle'
 
//Regras de validação
const validationSchema = Yup.object().shape({
  phone: Yup.string()
  .matches('[0-9]{11}', 'Insira apenas os digitos com ddd, sem pontos, traços ou espaços'),
  
})
 
//Componente para login/signup com email
export const AddAccountBank = (props) => {

  const dispatch = useDispatch();
  const wallet = useSelector(state => state.withdrawState);
  const [visible, setVisible] = useState(false);
   
  const Continue = () => {
    setVisible(false)
    props.navigation.navigate('Requestwithdraw', {type: 'fiat'})
  };

  return (
    <Layout style={{width: '100%'}}>
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
              <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Icon fill='white' style = {{height: 24, width: 24, alginSelf: 'right'}} name='phone-outline'/>
              </Layout>
              <Text  style = {{marginTop: 8}} category = 'h6'>{wallet.fiatWallet.phone}</Text>
              <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>O número está correto?</Text>
              <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                  <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                  Editar
                  </Button>
                  <Button style = {{margin: 12}} status = 'success' onPress={() => Continue()}>
                  Confirmar
                  </Button>
              </Layout>
              </Layout>          
          </Card>
        </Modal>
      <Text style = {{marginBottom: 32, textAlign: 'center'}}>Insira um numero de telefone para receber a transferencia</Text>
      <Text style = {{marginBottom: 32, textAlign: 'center'}}>Enviaremos um SMS com um link para saque</Text>
      <Formik
        initialValues={{
          phone: wallet.fiatWallet.phone,
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { phone } = values;
          setVisible(true)
          dispatch(setFiatWallet(phone));
          resetForm({phone: phone})
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
              name='phone'
              value={values.phone}
              onChangeText={handleChange('phone')}
              placeholder='Telefone'
              onBlur={handleBlur('phone')}
              size = 'large'
           
            />
            <ErrorMessage status = 'hint' errorValue={touched.agency && errors.phone} />
            
            <Layout style = {{paddingTop: 64,}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                >Confirmar</Button>
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
