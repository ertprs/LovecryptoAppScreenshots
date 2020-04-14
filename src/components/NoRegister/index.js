
import React from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Text} from 'react-native-ui-kitten';

//Indicação visual que algum registro não foi encontrado
export const NoRegister = (props) => {

    const { type } = props;
    
    return (
        <Layout style={styles.containerImage}>
            <Text category='h2' status='danger'>Eita...</Text>
            { type == 'tasks' 
                ? <Text category='h6'>Sem novas tarefas por enquanto</Text>    
                : <Text category='h6'>Sem registro</Text>
            }
            { type == 'tasks'
                ? <Image source={require('../../../assets/images/waiting.png')} style={styles.noMoreTasks}></Image>
                : <Image source={require('../../../assets/images/not_found.png')} style={styles.noMoreTasks}></Image>
            }    
        </Layout>
    );
}



const styles = StyleSheet.create({  
    noMoreTasks: {
        marginTop: 20,
        width: 200,
        height: 200,
    },
    containerImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 70,
        paddingBottom: 40,
      },
  });
