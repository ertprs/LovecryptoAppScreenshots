import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Layout} from '@ui-kitten/components'

const ErrorMessage = ({ errorValue, status }) => (
  <Layout style={styles.container}>
    <Text status = {status == 'auth'? 'warning' : 'danger'} style={styles.errorText}>{errorValue}</Text>
  </Layout>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row', 
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
})

export default ErrorMessage