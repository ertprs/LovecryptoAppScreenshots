//Importações Externas
import React  from "react";
import { TouchableNativeFeedback} from "react-native";
import { Layout, Icon, Text, useTheme} from '@ui-kitten/components'

//Importações Internas
import { clickInfoEvent } from '../shared/analyticsLog'

export const Accordion = (props) => {
   
  const theme = useTheme();

  const [checked, setchecked] = React.useState(false);
 
  function changeState(){
    if(!checked){ clickInfoEvent(props.title, 'help')} 
    setchecked(!checked)
  }

  return (
    <Layout style = {{width: '100%', borderBottomWidth: 1, borderColor: '#E7ECF4'}}>
      <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple(theme['color-info-100'])}  onPress={changeState}>
        <Layout style = {{ padding: 16, paddingLeft: 20, display: 'flex', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', }}>
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
 