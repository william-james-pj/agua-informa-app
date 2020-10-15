import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import HeaderCustom from '../components/HeaderCustom';
import ButtonHome from '../components/ButtonHome';
import Carousel from '../components/Carousel';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [nome, setNome] = useState();

  User(auth().currentUser.uid);

  function User(userId) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            // console.log('User data: ', documentSnapshot.data());
            let nome = (documentSnapshot.data().nome).split(' ');
            setNome(`${nome[0]} ${nome[1] ? nome[1] : ''}`);
            setLoading(false);
          }
        });

      return () => subscriber();
    }, [userId]);
  }

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{width: '100%', height: '100%'}}>
      <HeaderCustom navigation={navigation} />
      <View style={styles.nomeContainer}>
        <Text style={{fontSize: 22, color: AppStyles.color.textColor}}>
          Olá,
        </Text>
        <Text style={{fontSize: 26, color: AppStyles.color.textColor2}}>
          {nome}
        </Text>
      </View>
      <View style={styles.botoesContainer}>
        <ButtonHome
          ValorText={'Abastecimento'}
          iconName={'faucet'}
          functionOnPress={() => {}}
        />
        <ButtonHome
          ValorText={'Dicas '}
          iconName={'lightbulb'}
          functionOnPress={() => { navigation.navigate('Dicas');}}
        />
        <ButtonHome
          ValorText={'Poluição'}
          iconName={'smog'}
          functionOnPress={() => {}}
        />
        <ButtonHome
          ValorText={'Relatos'}
          iconName={'comments'}
          functionOnPress={() => {}}
        />
      </View>
      <View style={styles.dicasContainer}>
        <Text
          style={{
            fontSize: 18,
            paddingLeft: 30,
            marginBottom: 20,
            color: AppStyles.color.textColor,
          }}>
          Destaque
        </Text>
        <Carousel />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  nomeContainer: {
    backgroundColor: AppStyles.color.fundo,
    flex: 1.5,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  botoesContainer: {
    backgroundColor: AppStyles.color.fundo,
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dicasContainer: {
    marginTop: 20,
    flex: 3,
    backgroundColor: AppStyles.color.fundo,
  },
});

export default HomeScreen;
