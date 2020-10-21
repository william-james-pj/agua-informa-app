import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {withFormik} from 'formik';
import * as Yup from 'yup';

import {Avatar, Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

import firestore from '@react-native-firebase/firestore';

const UselessTextInput = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 40);
  });

  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      textAlignVertical={'top'}
      maxLength={150}
      placeholder={'Qual é a sua dica?'}
      ref={inputRef}
    />
  );
};

const ModalWrite = (props) => {
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    props.values.text.length > 0 ? setDisable(false) : setDisable(true);
  }, [props.values.text]);

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
          style={[styles.button, {opacity: disable ? 0.5 : 1}]}
          disabled={disable}
          onPress={() => {
            props.handleSubmit();
            setTimeout(!props.errors.message ? props.close : {}, 500);
          }}>
          <Text style={{color: '#fff'}}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="small"
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            containerStyle={{backgroundColor: AppStyles.color.cinza}}
          />
        </View>
        <View style={{flex: 4, margin: 0, padding: 0}}>
          <UselessTextInput
            style={styles.text}
            multiline
            numberOfLines={20}
            value={props.values.text}
            onChangeText={(text) => props.setFieldValue('text', text)}
          />
        </View>
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
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    height: '50%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default withFormik({
  mapPropsToValues: ({uid}) => ({
    text: '',
    uid: uid,
  }),

  validationSchema: Yup.object().shape({
    text: Yup.string().required('Preencha o campo de senha'),
  }),

  handleSubmit: (values, {setSubmitting, setErrors}) => {
    firestore()
      .collection('RelatosTwitch')
      .add({
        uid: values.uid,
        text: values.text,
        date: new Date(),
      })
      .then(() => {
        // console.log('User added!');
      })
      .catch((e) => {
        setSubmitting(true);
        setErrors({message: 'Erro'});
      });
  },
})(ModalWrite);
