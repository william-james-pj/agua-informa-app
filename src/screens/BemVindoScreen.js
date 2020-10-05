import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import ButtonCustom from '../components/ButtonCustom';

function BemVindoScreen({navigation}) {
  return (
    <KeyboardAvoidingView style={styles.containerStyle}>
      <View style={styles.containerText}>
        <Text style={styles.titleStyle}>Bem-vindo</Text>
        <Text style={styles.subtitleStyle}>
          Faça login ou inscreva-se para continuar
        </Text>
        <Text style={styles.subtitleStyle}>usando nosso aplicativo</Text>
      </View>
      <View style={styles.containerImg}>
        <View style={styles.imgStyle} />
      </View>
      <View style={styles.containerButton}>
        <ButtonCustom
          testValue={'Conecte-se'}
          functionOnPress={() => navigation.navigate('Login')}
          // eslint-disable-next-line react-native/no-inline-styles
          parametosStyle={{ColorFundo: '#70D1D3'}}
        />
        <ButtonCustom
          testValue={'Criar nova conta'}
          functionOnPress={() => navigation.navigate('SignUp')}
          colorText={'#70D1D3'}
          // eslint-disable-next-line react-native/no-inline-styles
          parametosStyle={{
            ColorFundo: '#fff',
            widthBorder: 1,
            colorBorder: '#70D1D3',
            TopMargin: 20,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontSize: 26,
    color: '#70D1D3',
  },
  subtitleStyle: {
    fontSize: 10,
    color: '#C4C4C4',
  },
  containerImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: '60%',
    height: '80%',
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BemVindoScreen;
