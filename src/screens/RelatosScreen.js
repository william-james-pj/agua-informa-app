import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import RelatosTwitchScreen from '../components/RelatosTwitchScreen';

import {Icon, Overlay} from 'react-native-elements';

import ModalWrite from '../components/ModalWrite';

import firestore from '@react-native-firebase/firestore';

import {useFocusEffect} from '@react-navigation/native';

const RelatosScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [isLoading, setLoading] = useState(true);
  const [twitch, setTwitch] = useState([]);

  const {name, uid} = props.route.params;

  useEffect(() => {
    const subscriber = firestore()
      .collection('RelatosTwitch')
      .orderBy('date', 'desc')
      .onSnapshot((documentSnapshot) => {
        let items = [];
        let x = 0;
        documentSnapshot.forEach((item) => {
          items.push({
            name: item.data().name,
            text: item.data().text,
          });
          x++;
          x >= documentSnapshot.size ? setLoading(false) : null;
        });
        setTwitch(items);
      });
    return () => subscriber();
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
      <ScrollView>
        <View style={styles.boxInicio}>
          <Icon
            name={'smile-beam'}
            color={AppStyles.color.primary}
            type="font-awesome-5"
            size={35}
          />
          <Text style={styles.textBox}>
            Compartilhe suas ideias e dicas com a comunidade
          </Text>
        </View>
        {twitch.map((item, index) => {
          return (
            <RelatosTwitchScreen
              key={index}
              name={item.name}
              text={item.text}
            />
          );
        })}
      </ScrollView>
      <View style={styles.botaoFixo}>
        <TouchableOpacity style={styles.butoom} onPress={toggleOverlay}>
          <Icon
            name={'pencil-alt'}
            color={'#fff'}
            type="font-awesome-5"
            size={22}
          />
        </TouchableOpacity>
      </View>
      <Overlay
        fullScreen
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        // overlayStyle={styles.overlayContainer}
      >
        <ModalWrite name={name} uid={uid} close={toggleOverlay} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  boxInicio: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textBox: {
    fontSize: 18,
    textAlign: 'center',
    color: AppStyles.color.primary,
    marginTop: 15,
  },
  botaoFixo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: AppStyles.color.primary,
    bottom: 15,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  butoom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RelatosScreen;
