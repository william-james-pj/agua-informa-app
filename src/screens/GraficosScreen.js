import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import ModalGraficos from '../components/ModalGraficos';

import {Overlay} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const GraficosSreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [op, setOp] = useState([]);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState('NÃO');

  const toggleOverlay = (pergunta, texto) => {
    setOp([pergunta, texto]);
    setVisible(!visible);
  };

  let myloop = [];
  for (let i = 0; i <= 10; i++) {
    myloop.push(<Picker.Item key={i} label={i.toString()} value={i} />);
  }

  GetRespostas(auth().currentUser.uid);

  function GetRespostas(userId) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('Questionario')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setP1(documentSnapshot.data().p1);
            setP2(documentSnapshot.data().p2);
            setP3(documentSnapshot.data().p3);
            setP4(documentSnapshot.data().p4);
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
    <View style={{flex: 1}}>
      <ScrollView>
        <TitleCustom
          title={
            'Avaliação sobre a qualidade da água e abastecimento na região de Sorocaba'
          }
        />
        <View style={{flex: 1, padding: 10, marginTop: 10}}>
          <Text>Dê sua nota de 1 a 10 para:</Text>
          <View style={styles.containerPegunta}>
            <Text style={styles.textPegunta}>
              A qualidade da água que chega em sua casa
            </Text>
            <Picker
              mode={'dialog'}
              selectedValue={p1}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => {
                itemValue === 0 ? itemValue++ : null;
                firestore()
                  .collection('Questionario')
                  .doc(auth().currentUser.uid)
                  .update({
                    p1: itemValue,
                  });
              }}>
              {myloop}
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                toggleOverlay('p1', 'A qualidade da água que chega em sua casa')
              }>
              <Text style={{color: AppStyles.color.primary}}>
                {'Exibir Gráfico'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerPegunta}>
            <Text style={styles.textPegunta}>
              A qualidade do tratamento de água na região
            </Text>
            <Picker
              mode={'dialog'}
              selectedValue={p2}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => {
                itemValue === 0 ? itemValue++ : null;
                firestore()
                  .collection('Questionario')
                  .doc(auth().currentUser.uid)
                  .update({
                    p2: itemValue,
                  });
              }}>
              {myloop}
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                toggleOverlay(
                  'p2',
                  'A qualidade do tratamento de água na região',
                )
              }>
              <Text style={{color: AppStyles.color.primary}}>
                {'Exibir Gráfico'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerPegunta}>
            <Text style={styles.textPegunta}>
              A qualidade do abastecimento de água na região
            </Text>
            <Picker
              mode={'dialog'}
              selectedValue={p3}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => {
                itemValue === 0 ? itemValue++ : null;
                firestore()
                  .collection('Questionario')
                  .doc(auth().currentUser.uid)
                  .update({
                    p3: itemValue,
                  });
              }}>
              {myloop}
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                toggleOverlay(
                  'p3',
                  'A qualidade do abastecimento de água na região',
                )
              }>
              <Text style={{color: AppStyles.color.primary}}>
                {'Exibir Gráfico'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerPegunta}>
            <Text style={styles.textPegunta}>
              Em algum dia desta semana faltou aguá em sua casa
            </Text>
            <Picker
              mode={'dialog'}
              selectedValue={p4}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => {
                firestore()
                  .collection('Questionario')
                  .doc(auth().currentUser.uid)
                  .update({
                    p4: itemValue,
                  });
              }}>
              <Picker.Item label={'SIM'} value={'SIM'} />
              <Picker.Item label={'NÃO'} value={'NÃO'} />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                toggleOverlay(
                  'p4',
                  'Em algum dia desta semana faltou aguá em sua casa',
                )
              }>
              <Text style={{color: AppStyles.color.primary}}>
                {'Exibir Gráfico'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <ModalGraficos op={op} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPegunta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textPegunta: {
    flex: 2.2,
    paddingRight: 20,
    textAlign: 'justify',
  },
  pickerStyle: {
    height: 50,
    width: 50,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: AppStyles.color.primary,
    width: '40%',
  },
  overlayContainer: {
    padding: 0,
    width: '80%',
    height: '50%',
    // borderRadius: 20,
  },
});

export default GraficosSreen;
