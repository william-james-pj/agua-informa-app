import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Avatar, Icon, Overlay} from 'react-native-elements';

import {AppStyles, LoaderStyle} from '../AppStyles';
import HeaderCustom from '../components/HeaderCustom';
import RelatosTwitchScreen from '../components/RelatosTwitchScreen';
import ModalPerfil from '../components/ModalPerfil';

const PerfilScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [nome, setNome] = useState();
  const [twitch, setTwitch] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  GetName(auth().currentUser.uid);
  User(auth().currentUser.uid);

  function GetName(userId) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            let nome = documentSnapshot.data().nome.split(' ');
            setNome(`${nome[0]} ${nome[1] ? nome[1] : ''}`);
          }
        });
      return () => subscriber();
    }, [userId]);
  }

  function User(userId) {
    useEffect(() => {
      const subscriber2 = firestore()
        .collection('RelatosTwitch')
        .where('uid', '==', userId)
        .onSnapshot((documentSnapshot) => {
          let items = [];
          let x = 0;
          documentSnapshot.forEach((item) => {
            items.push({
              id: item.id,
              name: nome,
              text: item.data().text,
            });
            x++;
            x >= documentSnapshot.size ? setLoading(false) : null;
          });
          setTwitch(items);
        });
      return () => {
        subscriber2();
        setLoading(false);
      };
    }, [visible || nome]);
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
      <HeaderCustom navigation={navigation} />
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Avatar
              size="large"
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              containerStyle={styles.avatarContainer}
            />
            <TouchableOpacity style={styles.button} onPress={toggleOverlay}>
              <Text style={{color: AppStyles.color.primary}}>
                Editar perfil
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{nome}</Text>
          </View>
          <View style={styles.compContainer}>
            <Text style={{fontSize: 14, color: AppStyles.color.primary}}>
              Seus compartilhamentos
            </Text>
          </View>
        </View>
        {twitch.length === 0 ? (
          <View style={styles.boxInicio}>
            <Icon
              name={'sad-tear'}
              color={AppStyles.color.primary}
              type="font-awesome-5"
              size={35}
            />
            <Text style={styles.textBox}>
              Você ainda não compartilhou suas ideias e dicas com a comunidade
            </Text>
          </View>
        ) : (
          twitch.map((item, index) => {
            return (
              <RelatosTwitchScreen
                id={item.id}
                key={item.id}
                name={item.name}
                text={item.text}
              />
            );
          })
        )}
      </ScrollView>
      <Overlay
        fullScreen
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <ModalPerfil uid={auth().currentUser.uid} close={toggleOverlay} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 130,
    backgroundColor: '#fff',
    marginTop: 25,
    marginBottom: 20,
  },
  header: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    backgroundColor: AppStyles.color.cinza,
    // marginLeft: 20,
    top: -15,
    left: 15,
  },
  button: {
    marginRight: 20,
    width: 110,
    height: 30,
    borderWidth: 1,
    borderColor: AppStyles.color.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 3,
    paddingLeft: '5%',
  },
  compContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxInicio: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textBox: {
    fontSize: 16,
    textAlign: 'center',
    color: AppStyles.color.primary,
    marginTop: 15,
  },
  overlayContainer: {
    padding: 0,
  },
});

export default PerfilScreen;
