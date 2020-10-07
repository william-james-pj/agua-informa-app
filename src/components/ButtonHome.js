/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const ButtonHome = ({ValorText, functionOnPress, iconName}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={functionOnPress}>
      <Icon name={iconName} color="#2B3538" type="font-awesome-5" size={26} solid />
      <Text style={styles.textStyle}>{ValorText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '45%',
    borderRadius: 20,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
  },
  textStyle: {
    color: '#2B3538',
    fontSize: 14,
    marginTop: 5,
  },
});

export default ButtonHome;
