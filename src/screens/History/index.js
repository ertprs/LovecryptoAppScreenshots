import React, { Component } from "react";
import { Header } from '../../components/Header';
import { View, StyleSheet, Image} from "react-native";
import { NoRegister } from '../../components/NoRegister';
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, List} from 'react-native-ui-kitten';
import { HeaderHistory } from '../../components/HeaderHistory';

//Tela tem Histórico de Transações
export class HistoryScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: [1234, 1234, 1234, 1234, 1234],
      reward: [0.5, 0.25, 0.35, 1.0, 0.75],
      description: [ 'System', 'System', 'Partner', 'Partner', 'Partner'  ],
      date: ['07/12/19', '11/12/19', '20/12/19', '25/12/19', '02/01/20'],
    }
  }
  render() {
    const renderItem = ({ item, index }) => (
      <Layout style = { styles.container } level='2'>
        <Layout style = { styles.card } level='1'>
          <Layout class = "text">
              <Text  category='p2'>
                {this.state.date[index]}
              </Text>
              <Text appearance='hint'>
                {this.state.description[index]}
              </Text> 
          </Layout>
          <Layout class = "text">
              <Text category='label' style = { styles.value }>
                + {this.state.reward[index].toFixed(2)}
              </Text>
          </Layout>
        </Layout>
      </Layout>
    );
    return (
      <View>
        <ScrollView>
          <HeaderHistory/>
          <Header title = 'Withdraw History'/>
          <Layout style={styles.container} level='2'>
            <List
              data={ this.state.id}
              renderItem={renderItem}
            />  
          </Layout>
          { this.state.id.length == 0 &&
            <NoRegister type = 'history'></NoRegister>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingLeft: 24,
  },
  container: {
    padding: 8,
  },
  card:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 24,
    borderRadius: 4,  
  },
  value:{
    color: 'green'
  },
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
