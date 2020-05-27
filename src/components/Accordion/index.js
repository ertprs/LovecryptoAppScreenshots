import React  from "react";
import { StyleSheet, TouchableNativeFeedback} from "react-native";
import { Layout, Icon, Text} from '@ui-kitten/components'

export const Accordion = (props) => {

  const [checked, setchecked] = React.useState(false);
 
  function changeState(){
      setchecked(!checked)
  }

  return (
    <Layout style = {{ marginBottom: 4, width: '100%', borderBottomWidth: 1, borderColor: '#E7ECF4'}}>
        <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={changeState}>
            <Layout style = {{ padding: 16, display: 'flex', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', }}>
                <Text category = 'p1' style = {{maxWidth: 300}} >{props.title}</Text>
                <Icon fill='#222B45' style = {{height: 24, width: 24, alginSelf: 'right'}} name={checked ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'}/>
            </Layout>
        </TouchableNativeFeedback>
        {checked && 
        <Layout style = {{ padding: 16, paddingTop: 0}}>
            <Text category = 'p1' appearance = 'hint'>{props.description}</Text>
        </Layout>
        }
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  text:{
    color : '#7A05C8'
  },
});