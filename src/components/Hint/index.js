// import React from 'react';
// import { Button, Tooltip, Layout, Text} from '@ui-kitten/components';

// export const Hint = () => {

//   const [visible, setVisible] = React.useState(false);

//   function toggle(){
//       setVisible(!visible)
//   }
//   return (
//     <Layout>
//         <Button onPress={() => toggle()}>
//             TOGGLE TOOLTIP
//         </Button>
//         { visible && 
//             <Layout style = {{ backgroundColor: 'grey', borderRadius: 10, padding: 8, alignItems: 'center'}}>
//                 <Text>Teste</Text>
//             </Layout>
//         }
    
//     </Layout>
   
//   );
// };



import React from 'react';
import { Button, Tooltip, Layout } from '@ui-kitten/components';

export const Hint = () => {

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
    </Button>
  );

  return (
      <Layout>
            {/* <Tooltip
      anchor={renderToggleButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}>
      Welcome to UI Kitten 😻
    </Tooltip> */}
      </Layout>

  );
};
