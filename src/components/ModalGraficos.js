import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, Text as Texto} from 'react-native';
import {Text} from 'react-native-svg';

import {AppStyles, LoaderStyle} from '../AppStyles';

import {PieChart} from 'react-native-svg-charts';

import firestore from '@react-native-firebase/firestore';

const ModalGraficos = ({op}) => {
  const [isLoading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Questionario')
      .where('p1', '>', 0)
      .onSnapshot((documentSnapshot) => {
        let items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let porcentagem = [];
        let qtd = 0;
        documentSnapshot.forEach((item) => {
          if (op[0] === 'p1') {
            items[item.data().p1]++;
          } else if (op[0] === 'p2') {
            items[item.data().p2]++;
          } else if (op[0] === 'p3') {
            items[item.data().p3]++;
          } else {
            if (item.data().p4 === 'SIM') {
              items[0]++;
            } else {
              items[1]++;
            }
            // items[item.data().p4]++;
          }

          qtd++;
        });
        for (let i = 0; i <= 10; i++) {
          porcentagem.push(`${Math.round((items[i] * 100) / qtd)}`);
          // i >= documentSnapshot.size ? setLoading(false) : null;
        }
        // console.log(porcentagem);
        setQuantidade(qtd);
        setDados(porcentagem);
        setTimeout(() => { setLoading(false); }, 500);
      });
    return () => subscriber();
  }, [op]);

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData =
    dados.length !== 0
      ? dados
          // .filter((value) => value > 0)
          .map((value, index) => ({
            index,
            value,
            svg: {
              fill: randomColor(),
            },
            key: `pie-${index}`,
          }))
      : 0;

  const Label = ({slices}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;
      // eslint-disable-next-line no-lone-blocks
      {
        if (data.value > 0) {
          return (
            <View key={`label-${index}`}>
              <Text
                x={pieCentroid[0]}
                y={pieCentroid[1] - 10}
                fill="white"
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
                fontSize={18}>
                {op[0] === 'p4'
                  ? data.index === 1
                    ? 'NÃO'
                    : 'SIM'
                  : data.index}
              </Text>
              <Text
                x={pieCentroid[0]}
                y={pieCentroid[1] + 10}
                fill="white"
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
                fontSize={18}>
                {data.value + '%'}
              </Text>
            </View>
          );
        }
      }
    });
  };

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Texto style={{textAlign: 'center', fontSize: 16}}>{op[1]}</Texto>
      </View>
      <Texto style={{ padding: 6 }}>Total de Resposta: {quantidade}</Texto>
      <View style={styles.graficoContainer}>
        <PieChart style={{height: '100%'}} data={pieData}>
          <Label />
        </PieChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graficoContainer: {
    padding: 30,
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalGraficos;
