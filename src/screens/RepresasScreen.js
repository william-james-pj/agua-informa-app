import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import TitleCustom from '../components/TitleCustom';

const RepresasScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <TitleCustom title={'Represas'} />
        <View style={styles.container}>
          <View style={styles.conteudo}>
            <Text style={styles.textStyle}>
              Para abastecer a cidade de Sorocaba é capitada água de três
              represas, sendo elas, Clemente, Ipaneminha e principalmente a
              represa de itupararanga.
            </Text>
            <Text style={styles.textStyle}>
              A represa de Itupararanga fica localizada na estrada Vicinal da
              Represa de Itupararanga, em Votorantim, O volume útil estimado é
              de 286 milhões de m³. O seu reservatório abastece Ibiúna 100%,
              Sorocaba 74%, Votorantim 92% e São Roque 32% e outras cidades
              vizinhas. Sua paisagem fez com que a represa virasse um ponto
              turístico na região, mas para garantir a preservação da represa
              foi criado o projeto SOS Itupararanga.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  conteudo: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    height: 'auto',
    padding: 20,
    paddingTop: 10,
  },
  textStyle: {
    textAlign: 'justify',
    marginTop: 10,
  },
});

export default RepresasScreen;
