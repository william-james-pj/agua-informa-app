import {StyleSheet, Dimensions} from 'react-native';

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
