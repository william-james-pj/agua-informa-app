/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const ButtonCustom = ({
  testValue,
  functionOnPress,
  parametosStyle,
  colorText,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, estiloVariavel(parametosStyle)]}
      onPress={functionOnPress}>
      <Text style={{color: colorText ? colorText : '#fff'}}>{testValue}</Text>
    </TouchableOpacity>
  );
};

let estiloVariavel = function (parametos) {
  return {
    backgroundColor: parametos.ColorFundo ? parametos.ColorFundo : '#fff',
    borderWidth: parametos.widthBorder ? parametos.widthBorder : 0,
    borderColor: parametos.colorBorder ? parametos.colorBorder : '#fff',
    marginTop: parametos.TopMargin ? parametos.TopMargin : 0,
  };
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    borderRadius: 20,
  },
});

export default ButtonCustom;
