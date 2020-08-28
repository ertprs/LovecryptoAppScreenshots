//Importações Externas
import {
  Layout,
  Text,
  List,
  Button,
  Icon
  } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableNativeFeedback, ImageBackground} from 'react-native';
import { taskEvent } from '../shared/analyticsLog'
//Importações Internas
import { Alert } from './alert';
import { Loading } from './loading';
import { NoRegister } from './noregister';
import { getTasks } from '../api/getTasks';
import { LoadingSurveyList } from './loadingSurveyList'
import { multiplier } from '../shared/constants'
const ArrowIcon = (props) => (
    <Icon {...props} fill = 'white' name='arrow-forward-outline'/>
);

export const  SurveyList = (props) => {

    const user = useSelector(state => state.userState);

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    
    const openTask = async (id) => {
        taskEvent('taskStart')
        props.navigation.navigate('Task',{
            screen: 'Task',
            params: { id: id },
        });
    };
 
    //Precisa Otimizar
    useEffect(() => {
        setLoading(true)
        getTasks().then(response => {
            setTasks(response)
            setLoading(false)
            console.log(JSON.stringify(response))
        })
      }, [user.points, user.balance]);  
   
    const renderItem = ({ item, index }) => (
        <ImageBackground source={item.campaign.cover != null ? { uri: item.campaign.cover } : require('../assets/images/task_cover.jpg')} style={styles.image}>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#9843D0')}  onPress={() => openTask(item.id)}>
                <Layout style = {styles.overlay}>
                    <Text
                        category= {  'h4'}
                        status='control'>
                        {item.name}
                    </Text>
            
                    <Layout style={styles.infoRow}>
                        <Button
                            style = {styles.info}
                            size = 'tiny'
                            status='info'>
                            {item.qtd_questions} perguntas
                        </Button>
                        { item.points != null &&
                        <Button
                            style = {styles.info}
                            size = 'tiny'
                            status='success'>
                        {Number(item.points)} pontos
                        </Button>
                        }
                        { item.reward != null &&
                            <Button
                                style = {styles.info}
                                size = 'tiny'
                                status='success'>
                                {Number(item.reward / multiplier)} cUSD
                            </Button>
                        }
                    </Layout>
                    <Button
                        style={styles.arrowButton}
                        size='small'
                        appearance='ghost'
                        accessoryLeft={ArrowIcon}>
                    </Button>
                </Layout>
            </TouchableNativeFeedback>
        </ImageBackground>
    );
    
    return (
        <Layout level = '2' style={{flex: 1, paddingHorizontal: 16, paddingVertical: 8,}}>
            <Alert/>
            <List
                data={ tasks }
                renderItem={ renderItem }
                style = {{backgroundColor: 'transparent'}}
            />
            { loading &&
             <LoadingSurveyList/>
             
            }
            { ( tasks == null || tasks.length == 0)  && ! loading &&
            <NoRegister type = 'tasks'/>
            }
        </Layout>
    );
}
  
const styles = StyleSheet.create({
    image: {
        minHeight: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical:8,
    },
    arrowButton: {
        position: 'absolute',
        paddingTop: 10,
        right: 16,
        bottom: 16,
        borderRadius: 16,
        paddingHorizontal: 0,
    },
    overlay:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(100,100,160,0.3)',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    infoRow:{
        position: 'absolute',
        bottom: 16,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginLeft: 8,
    },
    info:{
        borderRadius: 16,
        marginLeft: 8,
    }
});