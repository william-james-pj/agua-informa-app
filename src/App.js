import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BemVindoScreen from './screens/BemVindoScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BemVindo">
        <Stack.Screen
          name="BemVindo"
          component={BemVindoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerTitle: false, headerTintColor: '#70D1D3'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerTitle: false, headerTintColor: '#70D1D3'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
