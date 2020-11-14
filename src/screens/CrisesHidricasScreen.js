import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';

import TitleCustom from '../components/TitleCustom';

const CrisesHidricasScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <TitleCustom title={'Crises Hídricas em Sorocaba'} />
        <View style={styles.container}>
          <View style={styles.conteudo}>
            <Text style={styles.textStyle}>
              Não é de hoje que os habitantes da cidade de Sorocaba sofrem com o
              revezamento no abastecimento de água, as vezes ficando cerca de 13
              horas ou até mesmo dias sem receberem uma gota de água em suas
              casas, uma das piores crises que a cidade enfrentou foi nos anos
              de 2014 e 2015, porém pelo menos uma vez a cada ano, a cidade
              enfrenta o sistema de revezamento.
            </Text>
            <Text style={styles.textStyle}>
              Neste ano (2020) não é diferente, desde o dia 12 de setembro,
              Sorocaba vive com o rodízio no abastecimento de água em alguns
              bairros da cidade, para tentar reduzir o consumo de água por parte
              da população, mas mesmo assim, o número de denúncias feitas por
              parte da população ao ver algum morador desperdiçando água
              continua crescendo.
            </Text>
            <Text style={styles.textStyle}>
              Essas crises se dão, pois muitas vezes a região fica meses sem
              chuva, do consumo excessivo por parte das empresas, mas
              principalmente pelo consumo por parte da população. Por isso, é
              muito importante que a população siga as dicas de como podemos
              economizar água no dia a dia.
            </Text>
            <View style={styles.ref}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://www.saneamentobasico.com.br/pannunzio-admite-que-abastecimento-de-agua-em-sorocaba-vive-momento-de-crise/',
                  )
                }>
                <Text style={styles.item}>{`Referência 1`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://g1.globo.com/sp/sorocaba-jundiai/noticia/2020/10/01/sorocaba-prorroga-rodizio-no-abastecimento-de-agua.ghtml',
                  )
                }>
                <Text style={styles.item}>{`Referência 2`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  conteudo: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    height: 'auto',
    padding: 20,
    paddingTop: 10,
  },
  textStyle: {
    textAlign: 'justify',
    marginTop: 10,
  },
  ref: {
    marginTop: 20,
  },
  item: {
    marginBottom: 5,
    color: 'blue',
    fontSize: 13,
  },
});

export default CrisesHidricasScreen;
