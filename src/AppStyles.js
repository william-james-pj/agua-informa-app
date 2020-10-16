import {StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

export const AppStyles = {
  color: {
    fundo: '#F3F1F1',
    primary: '#70D1D3',
    cinza: '#C4C4C4',
    textColor: '#70D1D3',
    textColor2: '#2B3538',
    iconHome: '#2B3538',
    inputColor: '#88929E',
  },
};

export const LoaderStyle = {
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.fundo,
  },
};

function fontSizer() {
  if (screenWidth > 400) {
    return 28;
  } else if (screenWidth > 250) {
    return 26;
  } else {
    return 22;
  }
}

export const TextTitleSize = {
  size: {
    tamanho : fontSizer(),
  },
};
