import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {TextTitleSize} from '../AppStyles';

const TitleCustom = ({title, colorText}) => {
  return (
    <View style={styles.containerHeader}>
      <Text style={[styles.textHeaderStyle,{color: colorText ? colorText : '#70D1D3'}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: 'center',
  },
  textHeaderStyle: {
    fontSize: TextTitleSize.size.tamanho,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default TitleCustom;
