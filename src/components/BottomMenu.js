import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import styles from '../utils/styles';

const BottomMenu = ({ navigation }) => {
    const handlePress = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.bottomMenuContainer}>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('DirectoryScreen')}>
                <Image source={require('../assets/icons/list.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Atlas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('ResultScreen')}>
                <Image source={require('../assets/icons/gallery.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabCentered} onPress={() => handlePress('HomeScreen')}>
                <View style={styles.centeredIconContainer}>
                    <Image source={require('../assets/icons/camera.png')} style={styles.BottomMenuicon} />
                </View>
               
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('HistoryScreen')}>
                <Image source={require('../assets/icons/history.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Historia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('AccountScreen')}>
                <Image source={require('../assets/icons/user.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Konto</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomMenu;
