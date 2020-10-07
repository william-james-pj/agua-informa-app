import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Input, Icon} from 'react-native-elements';

import HeaderCustom from '../components/HeaderCustom';
import TitleCustom from '../components/TitleCustom';
import ButtonCustom from '../components/ButtonCustom';

const PerfilScreen = (props) => {
  const [editavel, setEditavel] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setEditavel(true);
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            props.setFieldValue('nome', documentSnapshot.data().nome);
            props.setFieldValue('telefone', documentSnapshot.data().telefone);
            props.setFieldValue('cpf', documentSnapshot.data().cpf);
          }
        });
    }, []),
  );

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <HeaderCustom navigation={props.navigation} />
        <TitleCustom title={'Perfil'} />
        <View style={styles.containerTextBox}>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: '#70D1D3', fontSize: 12}}
            label="Nome"
            placeholder="Nome"
            disabled={editavel}
            leftIcon={
              <Icon
                name="user"
                type="font-awesome-5"
                color="#c4c4c4"
                size={20}
              />
            }
            inputStyle={{fontSize: 14}}
            value={props.values.nome ? props.values.nome : ''}
            onChangeText={(text) => props.setFieldValue('nome', text)}
            errorMessage={props.touched.nome && props.errors.nome}
          />
          <View style={styles.containerTextBoxRow}>
            <Input
              containerStyle={styles.inputContainerStyle2}
              labelStyle={{color: '#70D1D3', fontSize: 12}}
              label="Celular"
              placeholder="Celular"
              disabled={editavel}
              leftIcon={
                <Icon
                  name="mobile-alt"
                  type="font-awesome-5"
                  color="#c4c4c4"
                  size={20}
                />
              }
              keyboardType={'number-pad'}
              value={props.values.telefone ? props.values.telefone : ''}
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
              disabled={editavel}
              leftIcon={
                <Icon
                  name="id-card"
                  type="font-awesome-5"
                  color="#c4c4c4"
                  size={20}
                />
              }
              value={props.values.cpf ? props.values.cpf : ''}
              onChangeText={(text) => props.setFieldValue('cpf', text)}
              keyboardType={'number-pad'}
              inputStyle={{fontSize: 14}}
              errorMessage={props.touched.cpf && props.errors.cpf}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <ButtonCustom
            testValue={'Editar'}
            functionOnPress={() => setEditavel(false)}
            colorText={'#70D1D3'}
            // eslint-disable-next-line react-native/no-inline-styles
            parametosStyle={{
              ColorFundo: '#f3f3f3',
              widthBorder: 1,
              colorBorder: '#70D1D3',
              Width: '40%',
            }}
          />
          <ButtonCustom
            testValue={'Salvar'}
            Disabled={editavel}
            functionOnPress={() => {
              props.handleSubmit();
              setEditavel(true);
            }}
            parametosStyle={{ColorFundo: '#70D1D3', Width: '40%'}}
          />
        </View>
        <View style={styles.containerErro}>
          {props.errors.message && (
            <Text style={{fontSize: 12, color: 'green'}}>
              {props.errors.message}
            </Text>
          )}
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
    justifyContent: 'space-around',
    marginTop: 5,
    flexDirection: 'row',
  },
  containerErro: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default withFormik({
  mapPropsToValues: (nome, telefone, cpf) => ({
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

  handleSubmit: (values, {setSubmitting, setErrors}) => {
    firestore().collection('Users').doc(auth().currentUser.uid).update({
      nome: values.nome,
      cpf: values.cpf,
      telefone: values.telefone,
    }).then(() => {
      setSubmitting(false);
      setErrors({message: 'Usuário atualizado com sucesso!'});
    });
  },
})(PerfilScreen);
