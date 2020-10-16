import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import HeaderCustom from '../components/HeaderCustom';
import BoxTextos from '../components/BoxTextos';
import TitleCustom from '../components/TitleCustom';

import firestore from '@react-native-firebase/firestore';

const PoluicaoScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [poluicao, setPoluicao] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Poluicao')
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
        setPoluicao(items);
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
    <View style={{flex: 1}}>
      <HeaderCustom navigation={props.navigation} />
      <ScrollView>
        {poluicao.map((item, index) => {
          return (
            <View key={index + 100} style={styles.container}>
              <TitleCustom title={item.title} />
              <View style={{alignItems: 'center'}}>
                <BoxTextos texto={item.texto.split('\\n').join('\n\n')} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
});

export default PoluicaoScreen;
