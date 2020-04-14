import React, { Component } from "react";
import { StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Input, Button} from 'react-native-ui-kitten'
import { withNavigation, SafeAreaView } from "react-navigation";

const useInputChanges = (initialValue = '') => {
  //const [value, setValue] = React.useState(initialValue);
  value = initialValue
  setValue = initialValue
  return {
    value,
    onChangeText: setValue,
  };
};

const styles = StyleSheet.create({
  container: {  
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F8F9FB',
    padding: 16,
    paddingTop: 0,
  },
  text:{
    flexWrap: 'wrap',
    color : '#7A05C8',
    paddingVertical: 24,
    paddingHorizontal: 8,

  },
  input: {
    marginVertical: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    //backgroundColor: '#3366FF',
  },
  button: {
    marginTop: 24
  },
  image: {
    height: 200,
    width: 200,
    borderRadius:100,
    paddingVertical: 16,
    marginTop: 24,
    alignSelf: 'center',
  }
  
});

{/* <Image  style={{width: 200, height: 200}} source={{uri: 'https://placeimg.com/200/200/tech'}} ></Image> */}
      
const infoInputChanges = useInputChanges();

export class PaymentAccountsScreen extends Component {
  render() {
    return (
    
    <Layout style = {styles.container}>
      <ScrollView>
        <Image style = {styles.image} source={{uri: 'https://placeimg.com/200/200/tech'}}/>
        <Text style = {styles.text}>Please insert your Coinbase account</Text>

        <Input
          style={styles.input}
          status='info'
          placeholder='Coinbase Account'
        
        />
        <Input
          style={styles.input}
          status='info'
          placeholder='Amount'
        
        />
        <Button style={styles.button}>Confirm</Button>
      </ScrollView>
    </Layout>
    );
  }
}





//export const PaymentAccounts = withNavigation(PaymentConfig);