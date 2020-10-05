import React, { useState} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {Header} from 'react-native-elements';
import ButtonCustom from '../components/ButtonCustom';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function sair() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

function HomeScreen() {
  const [nome, setNome] = useState('');

  firestore()
  .collection('Users')
  .doc(auth().currentUser.uid)
  .get()
  .then(documentSnapshot => {
    if (documentSnapshot.exists) {
      setNome(documentSnapshot.data().nome);
    }
  });

  return (
    <KeyboardAvoidingView>
      <Header
        placement="left"
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Text>Hello {nome} </Text>
      <ButtonCustom
        testValue={'Conecte-se'}
        functionOnPress={() => sair()}
        // eslint-disable-next-line react-native/no-inline-styles
        parametosStyle={{ColorFundo: '#70D1D3'}}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
