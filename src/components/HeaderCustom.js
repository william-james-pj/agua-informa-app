import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HeaderCustom = ({title}) => {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeaderStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: 'center',
  },
  textHeaderStyle: {
    fontSize: 26,
    color: '#70D1D3',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default HeaderCustom;
