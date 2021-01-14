import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {AppStyles, LoaderStyle} from '../AppStyles';
import TitleCustom from '../components/TitleCustom';
import ModalGraficos from '../components/ModalGraficos';

import firestore from '@react-native-firebase/firestore';

const GraficosScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [dados1, setDados1] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [dados3, setDados3] = useState([]);
  const [dados4, setDados4] = useState([]);
  const [quantidade, setQuantidade] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Questionario')
      .onSnapshot((documentSnapshot) => {
        let items1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let items2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let items3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let items4 = [0, 0];

        let qtd = [0, 0, 0, 0];
        let porcentagem = [];

        documentSnapshot.forEach((item) => {
          if (item.data().p1) {
            items1[item.data().p1]++;
            qtd[0]++;
          }
          if (item.data().p2) {
            items2[item.data().p2]++;
            qtd[1]++;
          }
          if (item.data().p3) {
            items3[item.data().p3]++;
            qtd[2]++;
          }
          if (item.data().p4 === 'SIM') {
            items4[0]++;
            qtd[3]++;
          } else {
            items4[1]++;
            qtd[3]++;
          }
        });

        porcentagem = [];
        for (let i = 0; i <= 10; i++) {
          porcentagem.push(`${Math.round((items1[i] * 100) / qtd[0])}`);
        }
        items1 = porcentagem;

        porcentagem = [];
        for (let i = 0; i <= 10; i++) {
          porcentagem.push(`${Math.round((items2[i] * 100) / qtd[0])}`);
        }
        items2 = porcentagem;

        porcentagem = [];
        for (let i = 0; i <= 10; i++) {
          porcentagem.push(`${Math.round((items3[i] * 100) / qtd[0])}`);
        }
        items3 = porcentagem;

        porcentagem = [];
        for (let i = 0; i <= 1; i++) {
          porcentagem.push(`${Math.round((items4[i] * 100) / qtd[0])}`);
        }
        items4 = porcentagem;

        setQuantidade(qtd);
        setDados1(items1);
        setDados2(items2);
        setDados3(items3);
        setDados4(items4);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    return () => subscriber();
  }, []);

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <TitleCustom title={'Graficos sobre as avaliações'} />
        <View style={styles.graficoContainer}>
          <ModalGraficos
            dadosGrafico={dados1}
            qtd={quantidade[0]}
            op={['p1', 'A qualidade da água que chega em sua casa']}
          />
        </View>
        <View style={styles.graficoContainer}>
          <ModalGraficos
            dadosGrafico={dados2}
            qtd={quantidade[1]}
            op={['p2', 'A qualidade do tratamento de água na região']}
          />
        </View>
        <View style={styles.graficoContainer}>
          <ModalGraficos
            dadosGrafico={dados3}
            qtd={quantidade[2]}
            op={['p3', 'A qualidade do abastecimento de água na região']}
          />
        </View>
        <View style={styles.graficoContainer}>
          <ModalGraficos
            dadosGrafico={dados4}
            qtd={quantidade[3]}
            op={['p4', 'Em algum dia desta semana faltou aguá em sua casa']}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  graficoContainer: {
    marginTop: 10,
  },
});

export default GraficosScreen;
