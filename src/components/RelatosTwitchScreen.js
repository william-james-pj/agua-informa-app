import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {Avatar, Icon, Overlay} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

const RelatosTwitchScreen = ({name, text, id}) => {
  const [visiblee, setVisiblee] = useState(false);

  // const toggleOverlaay = () => {
  //   setVisiblee(!visiblee);
  // };

  function deleteItem() {
    firestore()
      .collection('RelatosTwitch')
      .doc(id)
      .delete()
      .then(() => {
        setVisiblee(!visiblee);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size="medium"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          containerStyle={{backgroundColor: AppStyles.color.cinza}}
        />
      </View>
      <View style={{flex: 4, padding: 5}}>
        <View style={styles.nomeContainer}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>{name}</Text>
          {id ? (
            <TouchableOpacity
              style={{marginRight: '5%'}}
              onPress={() => setVisiblee(!visiblee)}>
              <Icon
                name={'trash'}
                color={AppStyles.color.iconHome}
                type="font-awesome-5"
                size={14}
                solid
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <Text style={{textAlign: 'justify'}}>{text}</Text>
        </View>
        {/* <View style={styles.iconContainer}>
          <Icon name={'heart'} color={AppStyles.color.cinza} type="font-awesome-5" size={18}/>
        </View> */}
      </View>
      {id ? (
        <>
          <Overlay
            isVisible={visiblee}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setVisiblee(!visiblee)}>
            <View style={{flex: 1}}>
              <View style={{flex: 3}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>Deletar</Text>
                <Text style={{marginTop: 10, fontSize: 16}}>
                  Você quer deletar isto?
                </Text>
              </View>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity onPress={() => setVisiblee(!visiblee)}>
                  <Text style={{color: 'red', marginRight: 20}}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem()}>
                  <Text style={{color: 'green'}}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 80, //100
    backgroundColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden',
    borderTopWidth: 0.6,
    borderTopColor: AppStyles.color.fundo,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  nomeContainer: {
    height: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
    paddingBottom: 5,
  },
  iconContainer: {
    height: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
  },
  overlay: {
    width: '80%',
    height: '20%',
    padding: 20,
  },
});

export default RelatosTwitchScreen;
