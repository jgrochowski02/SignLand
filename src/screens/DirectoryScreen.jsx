import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SignsList from '../components/SignsList';
import BottomMenu from '../components/BottomMenu';
import styles from '../utils/styles';

const DirectoryScreen = ({ navigation }) => {
    return (
        <View style={styles.containerNoCenter}>
            <Header title="ATLAS" />
            <SignsList navigation={navigation} />
            <BottomMenu navigation={navigation} />
        </View>
    );
};



export default DirectoryScreen;
