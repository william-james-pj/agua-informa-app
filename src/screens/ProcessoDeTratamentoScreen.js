import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import BoxTextos from '../components/BoxTextos';

import firestore from '@react-native-firebase/firestore';

const ProcessoDeTratamentoScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    firestore()
      .collection('ProcessosDeTratamento')
      .get()
      .then((querySnapshot) => {
        let items = [];
        let x = 0;
        querySnapshot.forEach((documentSnapshot) => {
          items.push({
            title: documentSnapshot.data().title,
            texto: documentSnapshot.data().text,
          });
          x++;
          x >= querySnapshot.size ? setLoading(false) : null;
        });
        setProcessos(items);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      <TitleCustom title={'Processo de tratamento'} />
      <View style={styles.container}>
        {processos.map((processo, index) => {
          return (
            <BoxTextos
              key={`processos-${index}`}
              index={index}
              title={processo.title}
              texto={processo.texto}
            />
          );
        })}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default ProcessoDeTratamentoScreen;
