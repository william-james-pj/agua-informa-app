import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Input, Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import ButtonCustom from '../components/ButtonCustom';

const LoginScreen = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TitleCustom title={'Conecte-se'} />
        <View style={styles.containerTextBox}>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="E-mail"
            placeholder="E-mail"
            leftIcon={
              <Icon
                name="envelope"
                type="font-awesome-5"
                color="#c4c4c4"
                size={20}
              />
            }
            keyboardType={'email-address'}
            inputStyle={{fontSize: 14}}
            value={props.values.email}
            onChangeText={(text) => props.setFieldValue('email', text)}
            errorMessage={props.touched.email && props.errors.email}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="Senha"
            placeholder="Senha"
            leftIcon={
              <Icon
                name="lock"
                type="font-awesome-5"
                color="#c4c4c4"
                size={20}
              />
            }
            inputStyle={{fontSize: 14}}
            secureTextEntry={true}
            value={props.values.senha}
            onChangeText={(text) => props.setFieldValue('senha', text)}
            errorMessage={props.touched.senha && props.errors.senha}
          />
        </View>
        <View style={styles.containerErro}>
          {props.errors.message && (
            <Text style={{fontSize: 12, color: 'red'}}>
              {props.errors.message}
            </Text>
          )}
        </View>
        <View style={[styles.containerText, {padding: 0}]}>
          <Text style={{fontSize: 12, color: AppStyles.color.primary}}>
            Esqueceu a senha?
          </Text>
        </View>
        <View style={styles.containerButton}>
          <ButtonCustom
            testValue={'Conecte-se'}
            functionOnPress={() => props.handleSubmit()}
            // eslint-disable-next-line react-native/no-inline-styles
            parametosStyle={{ColorFundo: AppStyles.color.primary}}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.textStyle}>Não tem conta?</Text>
          <Text
            style={styles.textSignUp}
            onPress={() => props.navigation.navigate('SignUp')}>
            inscrever-se
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTextBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: AppStyles.color.fundo,
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  inputContainerStyle: {
    width: '80%',
    marginTop: 0,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 12,
    color: AppStyles.color.cinza,
    marginRight: 15,
  },
  textSignUp: {
    fontSize: 12,
    color: AppStyles.color.primary,
    textTransform: 'uppercase',
  },
  containerErro: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    senha: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    senha: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha'),
  }),

  handleSubmit: (values, {setSubmitting, setErrors}) => {
    auth()
      .signInWithEmailAndPassword(values.email, values.senha)
      .then((value) => {})
      .catch((error) => {
        setSubmitting(false);
        if (error.code === 'auth/wrong-password') {
          setErrors({message: 'Senha inválida'});
        } else if (error.code === 'auth/user-not-found') {
          setErrors({
            message: 'Nenhum usuário correspondente ao e-mail fornecido',
          });
        } else {
          setErrors({message: 'Erro'});
        }
      });
  },
})(LoginScreen);
