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
import BoxDicas from '../components/BoxDicas';
import TitleCustom from '../components/TitleCustom';

import firestore from '@react-native-firebase/firestore';

const DicasScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [dicas, setDicas] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Dicas')
      .get()
      .then((querySnapshot) => {
        let items = [];
        let x = 0;
        querySnapshot.forEach((documentSnapshot) => {
          items.push({
            title: documentSnapshot.data().title,
            texto: documentSnapshot.data().text,
            icon: documentSnapshot.data().icon,
          });
          x++;
          (x >= querySnapshot.size) ? setLoading(false) : null;
        });
        setDicas(items);
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
      <TitleCustom title={'Dicas de Economia'} />
        <View style={styles.container}>
          {dicas.map((dica, index) => {
            return (
              <BoxDicas key={index} index={index} title={dica.title} texto={dica.texto} icon={dica.icon}/>
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

export default DicasScreen;
