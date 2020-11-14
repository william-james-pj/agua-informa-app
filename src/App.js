import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DrawerContent} from './screens/DrawerContent';

import BemVindoScreen from './screens/BemVindoScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import {AppStyles} from './AppStyles';
import {Icon} from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import DicasScreen from './screens/DicasScreen';
import PoluicaoScreen from './screens/PoluicaoScreen';
import RelatosScreen from './screens/RelatosScreen';
import GraficoScreen from './screens/GraficosScreen';

import AbastecimentoScreen from './screens/AbastecimentoScreen';
import ProcessoDeTratamentoScreen from './screens/ProcessoDeTratamentoScreen';
import CrisesHidricasScreen from './screens/CrisesHidricasScreen';
import RepresasScreen from './screens/RepresasScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
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
  }

  function tab() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Relatos') {
              iconName = 'comments';
            } else if (route.name === 'Grafico') {
              iconName = 'chart-pie';
            }
            return (
              <Icon
                name={iconName}
                size={28}
                color={color}
                type="font-awesome-5"
                solid
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: AppStyles.color.primary,
          inactiveTintColor: 'gray',
          showLabel: false,
        }}>
        <Tab.Screen name="Relatos" component={RelatosScreen} />
        <Tab.Screen name="Grafico" component={GraficoScreen} />
      </Tab.Navigator>
    );
  }

  function drawer() {
    return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="init"
        screenOptions={{
          headerTitle: false,
          headerTintColor: '#70D1D3',
          headerStyle: {
            backgroundColor: '#f3f1f1',
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
            },
            shadowRadius: 0,
            elevation: 0,
          },
        }}>
        <Stack.Screen
          name="init"
          component={drawer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Dicas" component={DicasScreen} />
        <Stack.Screen name="Abastecimento" component={AbastecimentoScreen} />
        <Stack.Screen name="Poluicao" component={PoluicaoScreen} />
        <Stack.Screen
          name="Relatos"
          component={tab}
          options={{
            headerTitle: false,
            headerTintColor: '#70D1D3',
            headerStyle: {
              backgroundColor: '#fff',
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
              },
              shadowRadius: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="ProcessoDeTratamento"
          component={ProcessoDeTratamentoScreen}
        />
        <Stack.Screen
          name="CrisesHidricas"
          component={CrisesHidricasScreen}
        />
        <Stack.Screen
          name="Represas"
          component={RepresasScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
