import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Input, Icon} from 'react-native-elements';

import {AppStyles, LoaderStyle} from '../AppStyles';
import HeaderCustom from '../components/HeaderCustom';
import TitleCustom from '../components/TitleCustom';
import ButtonCustom from '../components/ButtonCustom';
import TextInputCustom from '../components/TextInputCustom';

const PerfilScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [editavel, setEditavel] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setEditavel(true);
      props.setStatus({success: ''});
    }, []),
  );

  User(auth().currentUser.uid);

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
    <ScrollView>
      <KeyboardAvoidingView>
        <HeaderCustom navigation={props.navigation} />
        <TitleCustom title={'Perfil'} />
        <View style={styles.containerTextBox}>
          <Input
            containerStyle={styles.inputContainerStyle}
            labelStyle={{color: AppStyles.color.primary, fontSize: 12}}
            label="Nome"
            placeholder="Nome"
            disabled={editavel}
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
        </View>
        <View style={styles.containerButton}>
          <ButtonCustom
            testValue={'Editar'}
            functionOnPress={() => setEditavel(false)}
            colorText={AppStyles.color.primary}
            // eslint-disable-next-line react-native/no-inline-styles
            parametosStyle={{
              ColorFundo: AppStyles.color.fundo,
              widthBorder: 1,
              colorBorder: AppStyles.color.primary,
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
            parametosStyle={{ColorFundo: AppStyles.color.primary, Width: '40%'}}
          />
        </View>
        <View style={styles.containerErro}>
          {props.status && (
            <Text style={{fontSize: 12, color: 'green'}}>
              {props.status ? props.status.success : ''}
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

  handleSubmit: (values, {setSubmitting, setStatus}) => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
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
})(PerfilScreen);
