import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {Overlay} from 'react-native-elements';

import Modal from './Modal';

import {AppStyles, LoaderStyle} from '../AppStyles';

const {width: screenWidth} = Dimensions.get('window');

const CarouselHome = (props) => {
  const [isLoading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [firebaseItems, setFirebaseItems] = useState([]);
  const [itemModal, setItemModal] = useState([]);
  const [controle, setControle] = useState(0);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    firestore()
      .collection('ModalDestaque')
      .get()
      .then((querySnapshot) => {
        let items = [];
        let x = 0;
        querySnapshot.forEach((documentSnapshot) => {
          storage()
            .ref('imgDestaques/' + documentSnapshot.data().url)
            .getDownloadURL()
            .then((urlImg) => {
              items.push({
                title: documentSnapshot.data().title,
                url: urlImg,
                texto: documentSnapshot.data().text,
                ref: documentSnapshot.data().ref,
              });
              x++;
              x >= querySnapshot.size ? setLoading(false) : null;
            });
        });
        setFirebaseItems(items);
      });
  }, []);

  if (!isLoading) {
    if (controle === 0) {
      setItemModal(firebaseItems[0]);
      setControle(1);
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Image
          resizeMode="cover"
          style={styles.imgContainer}
          source={{
            uri: item.url,
          }}
        />
        <View style={styles.overlay} />
        <TouchableOpacity
          style={styles.buttomContainer}
          onPress={toggleOverlay}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Overlay
          // fullScreen
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayContainer}>
          <Modal close={toggleOverlay} item={itemModal} />
        </Overlay>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={LoaderStyle.loaderContainer}>
        <ActivityIndicator size="large" color={AppStyles.color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={100}
        itemWidth={screenWidth - 200}
        data={firebaseItems}
        renderItem={renderItem}
        onSnapToItem={() => {
          setItemModal(firebaseItems[carouselRef.current.currentIndex]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 200,
    height: screenWidth - 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imgContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  buttomContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 5,
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 10,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 12,
    bottom: 20,
  },
  overlayContainer: {
    width: '90%',
    height: '90%',
    padding: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default CarouselHome;
