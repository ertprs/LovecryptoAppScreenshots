//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

//Importações Internas
import ErrorMessage from './errormenssage';
import { TooltipInfo } from '../shared/tooltipInfo';
import { saveData } from '../memoryAccess/saveData';
import { clickInfoEvent } from '../shared/analyticsLog';
import { LoadingIndicator } from '../shared/loadingIcon';
import { setCryptoWallet } from '../store/actions/withdraw';

const renderHashIcon = (props) => (
  <TooltipInfo {...props} text = 'O hash é o identificador da carteira de destino' onPress = { () =>  clickInfoEvent('hash', 'AddCrypto')} />
);

//Regras de validação
const validationSchema = Yup.object().shape({
  hash: Yup.string()
    // .label('hash')
    // .required('Este campo deve ser preenchido')
    // .min(6, 'A senha deve ter pelo 6 caracteres ')
    .matches('^0x[a-fA-F0-9]{40}$', 'O formato da chave está errado'),
})

//Componente para login/signup com email
export const AddAccountCrypto = (props) => {

  const dispatch = useDispatch();
  const wallet = useSelector(state => state.withdrawState);

  const saveCryptoAccount = async (id, hash) => {
    dispatch(setCryptoWallet( id, hash))
  };

  return (
    <Layout style={{flex: 1}}>
      <Layout style = {{flexDirection: 'row', alignItems: 'center'}}>
        <Text category='s1' style = {{marginBottom: 32, fontWeight: 'bold'}}>Insira o hash da carteira para qual deseja enviar</Text>
      </Layout>
      <Formik
        initialValues={{
          hash: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { hash } = values;
          saveCryptoAccount('Celo', hash).then( () => {
            resetForm({hash: ''})
            setSubmitting(false);
            props.navigation.navigate('Requestwithdraw', {type: 'crypto'})
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
              name='hash'
              value={values.hash}
              onChangeText={handleChange('hash')}
              placeholder='Endereço da carteira Celo'
              onBlur={handleBlur('hash')}
              size = 'large'
              accessoryRight = {renderHashIcon}
              autoFocus
              style = {{marginBottom: 6}}
            />
            <ErrorMessage status = 'hint' errorValue={touched.hash && errors.hash} />
            <Layout style = {{paddingTop: 48 }} >
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
