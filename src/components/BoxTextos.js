import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

const BoxTextos = ({title, texto, icon, index}) => {
  function header() {
    if (icon || title) {
      return (
        <View style={styles.header}>
          <Text style={styles.textHeader}>{`${index + 1} - ${title}`}</Text>
          <Icon
            name={icon}
            color={AppStyles.color.iconHome}
            type="font-awesome-5"
            size={30}
            solid
          />
        </View>
      );
    }
  }

  return (
    <View style={[styles.boxContainer]}>
      {header()}
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
    height: 'auto',
    marginTop: 20,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    height: 50,
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
    height: 'auto',
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
});

export default BoxTextos;
