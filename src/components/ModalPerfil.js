import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Icon, Input} from 'react-native-elements';

import {AppStyles, LoaderStyle} from '../AppStyles';
import TextInputCustom from '../components/TextInputCustom';

import firestore from '@react-native-firebase/firestore';

const ModalPerfil = (props) => {
  const [isLoading, setLoading] = useState(true);

  User(props.uid);

  function User(userId) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            props.setFieldValue('nome', documentSnapshot.data().nome);
            props.setFieldValue('telefone', documentSnapshot.data().telefone);
            props.setFieldValue('cpf', documentSnapshot.data().cpf);
            setLoading(false);
          }
        });
      return () => subscriber();
    }, [userId]);
  }

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{marginLeft: 20}}>
          <Icon
            name={'times'}
            color={AppStyles.color.primary}
            type="font-awesome-5"
            size={22}
            onPress={props.close}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.handleSubmit();
          }}>
          <Text style={{color: '#fff'}}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 10}}>
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
          value={props.values.nome ? props.values.nome : ''}
          onChangeText={(text) => props.setFieldValue('nome', text)}
          errorMessage={props.touched.nome && props.errors.nome}
        />
        <TextInputCustom
          full
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
          full
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
      <View style={styles.containerErro}>
          {props.status && (
            <Text style={{fontSize: 12, color: 'green'}}>
              {props.status ? props.status.success : ''}
            </Text>
          )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginRight: 20,
    width: 110,
    height: 30,
    backgroundColor: AppStyles.color.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerErro: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default withFormik({
  mapPropsToValues: ({ uid }, nome, telefone, cpf) => ({
    uid: uid,
    nome: nome ? nome : '',
    telefone: telefone ? telefone : '',
    cpf: cpf ? cpf : '',
  }),

  validationSchema: Yup.object().shape({
    nome: Yup.string().required('Preencha o campo de nome'),
    telefone: Yup.string()
      .min(11, 'Telefone inválido')
      .max(11, 'Telefone inválido')
      .required('Preencha o campo de telefone'),
    cpf: Yup.string()
      .min(11, 'CPF inválido')
      .max(11, 'CPF inválido')
      .required('Preencha o campo de CPF'),
  }),

  handleSubmit: (values, {setSubmitting, setStatus}) => {
    firestore()
      .collection('Users')
      .doc(values.uid)
      .update({
        nome: values.nome,
        cpf: values.cpf,
        telefone: values.telefone,
      })
      .then(() => {
        setSubmitting(false);
        setStatus({success: 'Usuário atualizado com sucesso!'});
      });
  },
})(ModalPerfil);
