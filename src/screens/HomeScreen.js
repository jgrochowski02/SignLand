import React from 'react';
import { View, Button } from 'react-native';
import Header from '../components/Header';
import CameraComponent from '../components/CameraComponent';
import BottomMenu from '../components/BottomMenu';
import styles from '../utils/styles';

const HomeScreen = ({ navigation }) => {
    const goToProgress = (photoUri) => {
        // Tutaj możesz przejść do następnego ekranu, przekazując URI zdjęcia
        navigation.navigate('ProgressScreen', { photoUri });
    };
//  <CameraComponent goToProgress={goToProgress} /> pod Headerem
    return (
        <View style={styles.containerNoCenter}>
            <Header title="ZDJĘCIE" />
          
          <BottomMenu navigation={navigation} />
        </View>
    );
};

export default HomeScreen;
