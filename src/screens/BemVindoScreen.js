import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {AppStyles} from '../AppStyles';
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
          parametosStyle={{ColorFundo: AppStyles.color.primary}}
        />
        <ButtonCustom
          testValue={'Criar nova conta'}
          functionOnPress={() => navigation.navigate('SignUp')}
          colorText={AppStyles.color.primary}
          // eslint-disable-next-line react-native/no-inline-styles
          parametosStyle={{
            widthBorder: 1,
            colorBorder: AppStyles.color.primary,
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
    backgroundColor: AppStyles.color.fundo,
  },
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontSize: 26,
    color: AppStyles.color.primary,
  },
  subtitleStyle: {
    fontSize: 10,
    color: AppStyles.color.cinza,
  },
  containerImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: '60%',
    height: '80%',
    backgroundColor: AppStyles.color.cinza,
    borderRadius: 20,
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BemVindoScreen;
