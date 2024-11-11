import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import PhotosGallery from '../components/PhotosGallery';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import styles from '../utils/styles';

const PhotosScreen = ({navigation}) => {
    useEffect(() => {
        
        console.log('PhotosScreen loaded');
    }, []);

    return (
      <View style={styles.containerNoCenter}>
              <Header title="GALERIA" />
            <PhotosGallery />
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default PhotosScreen;
