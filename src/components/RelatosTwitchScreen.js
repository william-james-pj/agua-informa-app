import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Avatar, Icon} from 'react-native-elements';

import {AppStyles} from '../AppStyles';

const RelatosTwitchScreen = ({name, text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size="medium"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          containerStyle={{backgroundColor: AppStyles.color.cinza}}
        />
      </View>
      <View style={{flex: 4, padding: 5}}>
        <View style={styles.nomeContainer}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}} >{name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: 'justify' }}>{text}</Text>
        </View>
        {/* <View style={styles.iconContainer}>
          <Icon name={'heart'} color={AppStyles.color.cinza} type="font-awesome-5" size={18}/>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 80, //100
    backgroundColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden',
    borderTopWidth: 0.6,
    borderTopColor: AppStyles.color.fundo,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  nomeContainer: {
    height: 20,
    justifyContent: 'center',

  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
    paddingBottom: 5,
  },
  iconContainer: {
    height: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
  },
});

export default RelatosTwitchScreen;
