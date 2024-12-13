import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import CameraComponent from '../components/CameraComponent';
import styles from '../utils/styles';

const HomeScreen = ({ navigation }) => {
  
    return (
        <View style={styles.containerNoCenter}>
            <Header title="ZDJĘCIE" />
            
                <CameraComponent />
            
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default HomeScreen;