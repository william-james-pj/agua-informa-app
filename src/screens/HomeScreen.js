import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {Icon} from 'react-native-elements';

import HeaderCustom from '../components/HeaderCustom';
import ButtonHome from '../components/ButtonHome';
import Carousel from '../components/Carousel';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [nome, setNome] = useState('');

  firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        setNome(documentSnapshot.data().nome);
      }
    });

  return (
    <KeyboardAvoidingView style={{width: '100%', height: '100%'}}>
      <HeaderCustom navigation={navigation}/>

      <View style={styles.nomeContainer}>
        <Text style={{fontSize: 22, color:'#000'}}>Olá,</Text>
        <Text style={{fontSize: 26, color: '#000'}}>{nome}</Text>
      </View>
      <View style={styles.botoesContainer}>
        <ButtonHome
          ValorText={'Abastecimento'}
          iconName={'faucet'}
          functionOnPress={() => console.log('a')}
        />
        <ButtonHome
          ValorText={'Dicas '}
          iconName={'lightbulb'}
          functionOnPress={() => console.log('a')}
        />
        <ButtonHome
          ValorText={'Poluição'}
          iconName={'smog'}
          functionOnPress={() => console.log('a')}
        />
        <ButtonHome
          ValorText={'Relatos'}
          iconName={'comments'}
          functionOnPress={() => console.log('a')}
        />
      </View>
      <View style={styles.dicasContainer}>
        <Text style={{fontSize: 18, paddingLeft: 30, marginBottom: 20, color: '#000'}}>Destaque</Text>
        <Carousel />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  nomeContainer: {
    backgroundColor: '#F3F1F1',
    flex: 1.5,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  botoesContainer: {
    backgroundColor: '#F3F1F1',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dicasContainer: {
    marginTop: 20,
    flex: 3,
    backgroundColor: '#F3F1F1',
  },
});

export default HomeScreen;
