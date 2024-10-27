// src/screens/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import CameraComponent from '../components/CameraComponent';
import styles from '../utils/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.containerNoCenter}>
      <Header title="Zdjęcie" />
      <CameraComponent />
     
    </View>
  );
};

export default HomeScreen;
