import React from 'react'
import { Text, Layout, useTheme} from '@ui-kitten/components'

const ErrorMessage = ({ errorValue, status }) => {

  const theme = useTheme();
  
  //Mensagem de erro de entrada de campo
  if(status != 'auth'){
    if ( errorValue != undefined ){
      return(
        <Layout style = {{backgroundColor:  theme['color-info-100'] , padding: 4, borderRadius: 4, paddingHorizontal: 16,}}>
          <Text category='s2' status =  {'info'}>{ errorValue }</Text>
        </Layout>
      )
    //Quando não há erro
    }else{
      return null
    }
  //Mensagens de erro de signin/signup
  }else{
    return(
      <Layout style = {{backgroundColor: theme['color-warning-100'], padding: 4, borderRadius: 4, paddingHorizontal: 16, marginBottom: 8}}>
        <Text category='s2' status = 'danger'>{errorValue}</Text>
      </Layout>
    )
  }
  
}


export default ErrorMessage