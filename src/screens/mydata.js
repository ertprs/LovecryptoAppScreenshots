import React, { useState, useEffect, Fragment } from 'react';
import { Text, Layout, Icon, Card, Modal, useTheme, Button } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Platform, StyleSheet, StatusBar }  from 'react-native';
import { ThemeContext } from '../../theme-context'; 
import { TopNavigationHeader } from '../shared/topNavigation';
import { deleteUserApi } from '../api/deleteUserApi';
import { getData } from '../memoryAccess/getData'
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { CustomHeader } from '../shared/customHeader';
import { SectionBanner } from '../components/sectionbanner'
import { generalStyle } from '../shared/generalStyle';
const deleteUserFirebase = async () => {
    var user = auth().currentUser;
    user.delete().then(function() {
        console.log('usuario deletado do firebase')
    }).catch(function(error) {
        console.log(error.menssage)
    });
  }
   


  

export const MyDataScreen = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme(); 

    const [visible, setVisible] = useState(false);
    
    const clear = async (props) => {
        console.log('excluindo')
        setVisible(false)
        useEffect(() => {
            let id = null
            getData('@userData').then( data => {
                id = data.id
                deleteUserApi(id).then(() => {
                    deleteUserFirebase()
                });
            })
          }, [])
    };

    const renderContent = () => {
        return (
            <>
          <Modal
                            visible={visible}
                            backdropStyle={styles.backdrop}
                            onBackdropPress={() => setVisible(false)}>
                            <Card disabled={true}>
                                <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                                    <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25,backgroundColor: theme['color-danger-default'], justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon fill='white' style = {{height: 24, width: 24, alginSelf: 'right'}} name='log-out-outline'/>
                                    </Layout>
                                    <Text  style = {{marginTop: 8}} category = 'h6'>Logout</Text>
                                    <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>Tem certeza que deseja excluir sua conta?</Text>
                                    <Text  style = {{marginTop: 16, textAlign: 'center'}} category = 'p1' >Todos seus dados e possivel saldo</Text>
                                    <Text  style = {{ textAlign: 'center'}} category = 'p1' > será deletado dos nossos sistemas</Text>
                                    <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                                        <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                                            CANCELAR
                                        </Button>
                                        <Button style = {{margin: 12}} status = 'danger' onPress={() => clear()}>
                                            APAGAR
                                        </Button>
                                    </Layout>
                                </Layout>          
                            </Card>
                        </Modal>
                   
                    <Layout style={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', padding: 16,}}>
                            <Text style={{textAlign: 'center', marginTop: 48}}>Seus dados estão seguros com a Lovecrypto segundo nossa politica de privacidade</Text>
                            <Text appearance = 'hint' style={{textAlign: 'center', marginTop: 48}}>Ao clicar no botão abaixo, todos os dados sobre você em nossos servidores serão excluídos e sua conta encerrada</Text>
                            <Text status='danger' category='s1' style={{textAlign: 'center', marginTop: 16}}>Essa operação não pode ser desfeita</Text>
                    </Layout>
                    <Layout style={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', padding: 16,}}>
                    <Button style = {styles.button} status='danger' appearance='outline' onPress={() => setVisible(true)}>Apague meus dados</Button>
                  
                   </Layout>
          </>
        );
      };


    return(
        <Fragment>
        { Platform.OS == 'ios' &&
        <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
        }
        <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
          <ReactNativeParallaxHeader
            headerMinHeight={56}
            headerMaxHeight={220}
            extraScrollHeight={20}
            navbarColor= {theme['color-primary-default']}
            backgroundImage={require('../assets/images/mydata_bg.jpg')}
            renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Termos e Condições'} subtitle = {'teddf'}/>}
            renderContent={renderContent}
          />
      </SafeAreaView>
      </Fragment>
    )
};
 


const styles = StyleSheet.create({
    buttonCase:{
      width: '100%',
      padding: 4,
      padding: 50,
      paddingHorizontal: 48,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  });