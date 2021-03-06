import React from 'react';
import {StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';

const HeaderCustom = ({navigation, color = '#f3f1f1'}) => {
  return (
    <Header
      placement="left"
      containerStyle={{backgroundColor: color, paddingLeft: 30}}
      leftComponent={
        <Icon
          containerStyle={{paddingRight: 16}}
          type="font-awesome-5"
          name="bars"
          size={25}
          color="#70D1D3"
          onPress={() => navigation.openDrawer()}
        />
      }
      centerComponent={{text: 'Água Informa', style: {color: '#000'}}}
    />
  );
};

const styles = StyleSheet.create({});

export default HeaderCustom;
