import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { ProfileOption } from '../ProfileOption';


const data =  [
  { title: 'Editar Perfil', icon: 'edit-outline', route: 'Detail'},
  { title: 'Notificações', icon: 'bell-outline', route: 'Notifications'},
  { title: 'Ajuda', icon: 'question-mark-circle-outline',route: 'Suport'},
  { title: 'Legal', icon: 'file-text-outline', route: 'Legal'},
 ]

export const MyAccount = (props) => {
  return (
    <List
      navigation = {props.navigation}
      style = {styles.container}
      data={data}
      renderItem={ProfileOption}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: -50,
  },
});