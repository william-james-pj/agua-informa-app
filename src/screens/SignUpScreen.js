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

import TitleCustom from '../components/TitleCustom';
import ButtonCustom from '../components/ButtonCustom';

const SignUpScreen = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TitleCustom title={'Criar nova conta'} />
        <View style={styles.containerTextBox}>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: '#70D1D3', fontSize: 12}}
            label="Nome"
            placeholder="Nome"
            leftIcon={
              <Icon
                name="user"
                type="font-awesome-5"
                color="#c4c4c4"
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
            labelStyle={{color: '#70D1D3', fontSize: 12}}
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
          <View style={styles.containerTextBoxRow}>
            <Input
              containerStyle={styles.inputContainerStyle2}
              labelStyle={{color: '#70D1D3', fontSize: 12}}
              label="Celular"
              placeholder="Celular"
              leftIcon={
                <Icon
                  name="mobile-alt"
                  type="font-awesome-5"
                  color="#c4c4c4"
                  size={20}
                />
              }
              keyboardType={'number-pad'}
              value={props.values.telefone}
              onChangeText={(text) => {
                props.setFieldValue('telefone', text);
              }}
              inputStyle={{fontSize: 14}}
              errorMessage={props.touched.telefone && props.errors.telefone}
            />
            <Input
              containerStyle={styles.inputContainerStyle2}
              labelStyle={{color: '#70D1D3', fontSize: 12}}
              label="CPF"
              placeholder="CPF"
              leftIcon={
                <Icon
                  name="id-card"
                  type="font-awesome-5"
                  color="#c4c4c4"
                  size={20}
                />
              }
              value={props.values.cpf}
              onChangeText={(text) => props.setFieldValue('cpf', text)}
              keyboardType={'number-pad'}
              inputStyle={{fontSize: 14}}
              errorMessage={props.touched.cpf && props.errors.cpf}
            />
          </View>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: '#70D1D3', fontSize: 12}}
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
        <View style={styles.containerButton}>
          <ButtonCustom
            testValue={'Criar conta'}
            functionOnPress={() => props.handleSubmit()}
            parametosStyle={{ColorFundo: '#70D1D3'}}
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
    color: '#c4c4c4',
    marginRight: 15,
  },
  textSignUp: {
    fontSize: 12,
    color: '#70D1D3',
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
