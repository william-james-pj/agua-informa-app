import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {AppStyles} from '../AppStyles';

import TextInputMask from 'react-native-text-input-mask';

import {Icon} from 'react-native-elements';

const TextInputCustom = (props) => {
  return (
    <View
      style={[
        styles.container,
        props.errorMessage ? {top: 2} : null,
        props.full ? {width: '100%'} : {width: '40%'},
      ]}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.containerInput}>
        <Icon
          name={props.iconName}
          type="font-awesome-5"
          color={AppStyles.color.cinza}
          size={20}
          style={{top: 13, marginRight: 5}}
        />
        <TextInputMask
          editable={!props.disabled ? true : false}
          keyboardType={props.typeKeyboard}
          style={[
            styles.inputStyle,
            {color: !props.disabled ? '#000' : AppStyles.color.inputColor},
          ]}
          mask={props.mascara}
          placeholderTextColor={AppStyles.color.inputColor}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
        />
      </View>
      <Text style={[styles.textErro, estiloVariavel(props.errorMessage)]}>
        {props.errorMessage}
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
  },
  textErro: {
    color: 'red',
    fontSize: 11,
    top: -5,
  },
});

export default TextInputCustom;
