import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Input, Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import ButtonCustom from '../components/ButtonCustom';
import TextInputCustom from '../components/TextInputCustom';

const SignUpScreen = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TitleCustom title={'Criar nova conta'} />
        <View style={styles.containerTextBox}>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="Nome"
            placeholder="Nome"
            leftIcon={
              <Icon
                name="user"
                type="font-awesome-5"
                color={AppStyles.color.cinza}
                size={20}
              />
            }
            inputStyle={{fontSize: 14}}
            value={props.values.nome}
            onChangeText={(text) => props.setFieldValue('nome', text)}
            errorMessage={props.touched.nome && props.errors.nome}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="E-mail"
            placeholder="E-mail"
            leftIcon={
              <Icon
                name="envelope"
                type="font-awesome-5"
                color={AppStyles.color.cinza}
                size={20}
              />
            }
            keyboardType={'email-address'}
            inputStyle={{fontSize: 14}}
            value={props.values.email}
            onChangeText={(text) => props.setFieldValue('email', text)}
            errorMessage={props.touched.email && props.errors.email}
          />
          <View style={styles.containerTextBoxRow}>
            <TextInputCustom
              label="Celular"
              placeholder="Celular"
              mascara={'([00]) [0]-[0000]-[0000]'}
              iconName={'mobile-alt'}
              typeKeyboard={'number-pad'}
              errorMessage={props.touched.telefone && props.errors.telefone}
              value={props.values.telefone}
              onChangeText={(formatted, extracted) => {
                props.setFieldValue('telefone', extracted);
              }}
            />
            <TextInputCustom
              label="CPF"
              placeholder="CPF"
              mascara={'[000].[000].[000]-[00]'}
              iconName={'id-card'}
              typeKeyboard={'number-pad'}
              errorMessage={props.touched.cpf && props.errors.cpf}
              value={props.values.cpf}
              onChangeText={(formatted, extracted) => {
                props.setFieldValue('cpf', extracted);
              }}
            />
          </View>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="Senha"
            placeholder="Senha"
            leftIcon={
              <Icon
                name="lock"
                type="font-awesome-5"
                color={AppStyles.color.cinza}
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
        <View style={styles.containerButton}>
          <ButtonCustom
            testValue={'Criar conta'}
            functionOnPress={() => props.handleSubmit()}
            parametosStyle={{ColorFundo: AppStyles.color.primary}}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.textStyle}>Tem uma conta?</Text>
          <Text
            style={styles.textSignUp}
            onPress={() => props.navigation.navigate('Login')}>
            Conecte-se
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTextBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  inputContainerStyle: {
    width: '80%',
    marginTop: 0,
  },
  inputContainerStyle2: {
    width: '40%',
  },
  containerTextBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
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
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
  }),

  validationSchema: Yup.object().shape({
    nome: Yup.string().required('Preencha o campo de nome'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    telefone: Yup.string()
      .min(11, 'Telefone inválido')
      .max(11, 'Telefone inválido')
      .required('Preencha o campo de telefone'),
    cpf: Yup.string()
      .min(11, 'CPF inválido')
      .max(11, 'CPF inválido')
      .required('Preencha o campo de CPF'),
    senha: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha'),
  }),

  handleSubmit: (values, {setSubmitting, setErrors}) => {
    auth()
      .createUserWithEmailAndPassword(values.email, values.senha)
      .then((userInfo) => {
        //console.log(userInfo);
        firestore().collection('Users').doc(userInfo.user.uid).set({
          nome: values.nome,
          cpf: values.cpf,
          telefone: values.telefone,
        });
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrors({message: 'Esse endereço de email já esta em uso!'});
        } else {
          setErrors({message: 'Erro'});
        }
      });
  },
})(SignUpScreen);
