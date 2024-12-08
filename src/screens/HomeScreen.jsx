import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import CameraComponent from '../components/CameraComponent';
import styles from '../utils/styles';

const HomeScreen = ({ navigation }) => {
    const [photoUri, setPhotoUri] = useState(null);

    // Funkcja przejścia do ekranu wyniku z przesłanym zdjęciem
    const goToProgress = (photoName) => {
        navigation.navigate('ResultScreen', { photoName });
    };

    return (
        <View style={styles.containerNoCenter}>
            <Header title="ZDJĘCIE" />
            
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default HomeScreen;