import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import CameraComponent from '../components/CameraComponent';
import styles from '../utils/styles';
import { RNCamera } from 'react-native-camera';
import { Camera } from 'expo-camera/legacy';


const HomeScreen = ({ navigation }) => {
    const [photoUri, setPhotoUri] = useState(null);

    const goToProgress = (uri) => {
        navigation.navigate('ResultScreen', { photoUri: uri });
    };

    const handleCapture = (uri) => {
        setPhotoUri(uri);
        goToProgress(uri);
    };

    return (
        <View style={styles.containerNoCenter}>
            <Header title="ZDJĘCIE" />
        
                <CameraComponent onCapture={handleCapture} />
       
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default HomeScreen;