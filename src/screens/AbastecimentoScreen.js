import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';

import {AppStyles} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import ButtonHome from '../components/ButtonHome';

const AbastecimentScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <TitleCustom title={'Abastecimento de água'} />
      <View style={styles.botoesContainer}>
        <ButtonHome
          ValorText={'Processos de Tratamento'}
          iconName={'faucet'}
          Height={'20%'}
          functionOnPress={() => {
            navigation.navigate('ProcessoDeTratamento');
          }}
        />
        <ButtonHome
          ValorText={'Crises Hídricas'}
          iconName={'tint-slash'}
          Height={'20%'}
          functionOnPress={() => {
            navigation.navigate('CrisesHidricas');
          }}
        />
        <ButtonHome
          ValorText={'Represas'}
          iconName={'water'}
          Height={'20%'}
          functionOnPress={() => {
            navigation.navigate('Represas');
          }}
        />
        <ButtonHome
          ValorText={'Mais Notícias'}
          iconName={'newspaper'}
          Height={'20%'}
          functionOnPress={() => {
            Linking.openURL('https://www.saaesorocaba.com.br/');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botoesContainer: {
    backgroundColor: AppStyles.color.fundo,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    // alignContent: 'center',
  },
});

export default AbastecimentScreen;
