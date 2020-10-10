import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {AppStyles} from '../AppStyles';

import TextInputMask from 'react-native-text-input-mask';

import {Icon} from 'react-native-elements';

const TextInputCustom = ({
  label,
  placeholder,
  mascara,
  iconName,
  typeKeyboard,
  errorMessage,
  value,
  onChangeText,
}) => {
  return (
    <View style={[styles.container, errorMessage ? {top: 2} : null]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.containerInput}>
        <Icon
          name={iconName}
          type="font-awesome-5"
          color={AppStyles.color.cinza}
          size={20}
          style={{top: 13, marginRight: 5}}
        />
        <TextInputMask
          keyboardType={typeKeyboard}
          style={styles.inputStyle}
          mask={mascara}
          placeholderTextColor={AppStyles.color.inputColor}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <Text style={[styles.textErro, estiloVariavel(errorMessage)]}>
        {errorMessage}
      </Text>
    </View>
  );
};

let estiloVariavel = function (errorMessage) {
  return {
    paddingLeft: errorMessage ? 5 : 0,
    paddingTop: errorMessage ? 5 : 0,
  };
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  containerLabel: {
    margin: 0,
  },
  label: {
    margin: 0,
    color: AppStyles.color.primary,
    fontSize: 12,
    top: -7,
    fontWeight: 'bold',
  },
  containerInput: {
    width: '100%',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.inputColor,
    bottom: 6,
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    color: '#000',
  },
  textErro: {
    color: 'red',
    fontSize: 11,
    top: -5,
  },
});

export default TextInputCustom;
