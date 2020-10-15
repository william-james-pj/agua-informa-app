import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

const BoxDicas = ({title, texto, icon}) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>{title}</Text>
        <Icon
          name={icon}
          color={AppStyles.color.iconHome}
          type="font-awesome-5"
          size={30}
          solid
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{textAlign: 'justify'}}>{texto}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    height: 180,
    marginTop: 20,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  textHeader: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: '70%',
    padding: 20,
    alignItems: 'center',
  },
});

export default BoxDicas;
