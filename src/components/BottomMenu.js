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
                <Image source={require('../assets/list.png')} style={styles.icon} />
                <Text style={styles.label}>Atlas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('ResultScreen')}>
                <Image source={require('../assets/gallery.png')} style={styles.icon} />
                <Text style={styles.label}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabCentered} onPress={() => handlePress('HomeScreen')}>
                <View style={styles.centeredIconContainer}>
                    <Image source={require('../assets/camera.png')} style={styles.icon} />
                </View>
               
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('HistoryScreen')}>
                <Image source={require('../assets/history.png')} style={styles.icon} />
                <Text style={styles.label}>Historia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('AccountScreen')}>
                <Image source={require('../assets/user.png')} style={styles.icon} />
                <Text style={styles.label}>Konto</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomMenu;
