import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Linking,
} from 'react-native';

import {Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

const Modal = ({close, item}) => {
  const ref = item.ref.split(' ');

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} >{item.title}</Text>
        </View>
        <View style={styles.headerClose}>
          <Icon
            onPress={close}
            name={'times'}
            color={AppStyles.color.primary}
            type="font-awesome-5"
            size={26}
            solid
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            resizeMode="cover"
            style={styles.img}
            source={{
              uri: item.url,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={{textAlign: 'justify'}}>
            {item.texto.split('\\n').join('\n\n').split('\\m').join('\n')}
          </Text>
        </View>
        <View style={styles.referenciaContainer}>
          <Text style={{fontSize: 16}}>Referências</Text>
          <View style={styles.listContainer}>
            {ref.map((item, index) => {
              return (
                <Text
                  style={styles.item}
                  key={index}
                  onPress={() => Linking.openURL(item)}>{`Referência ${
                  index + 1
                }`}</Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 6,
    paddingLeft: 10,
  },
  headerClose: {
    flex: 1,
  },
  imgContainer: {
    backgroundColor: AppStyles.color.cinza,
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  referenciaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  listContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  item: {
    marginBottom: 5,
    color: 'blue',
    fontSize: 13,
  },
});

export default Modal;
