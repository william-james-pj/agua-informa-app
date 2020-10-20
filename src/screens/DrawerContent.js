import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {Avatar, Icon} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {AppStyles, LoaderStyle} from '../AppStyles';

function sair() {
  auth()
    .signOut()
    .then(() => {});
}

export function DrawerContent(props) {
  const [isLoading, setLoading] = useState(true);
  const [nome, setNome] = useState('');

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
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar
                size="medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={{backgroundColor: AppStyles.color.cinza}}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={styles.title}>{nome}</Text>
              </View>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Icon name="home" type="font-awesome-5" />}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={() => <Icon name="user" solid type="font-awesome-5" />}
              label="Perfil"
              onPress={() => {
                props.navigation.navigate('Perfil');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name="sign-out-alt" type="font-awesome-5" />}
          label="Sair"
          onPress={() => {
            sair();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  drawerSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
