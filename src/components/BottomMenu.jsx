import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import styles from '../utils/styles';
import {  FontAwesome5, Fontisto, Entypo , AntDesign } from '@expo/vector-icons';


const BottomMenu = () => {
    const navigation = useNavigation();
    const { isGuest } = useUserContext();

    const handlePress = (screen) => {
        if (isGuest && screen !== 'DirectoryScreen') {
            Alert.alert('Zaloguj się, aby odblokować dostęp.');
            navigation.navigate('LoginScreen');
        } else {
            navigation.navigate(screen);
        }
    };

    return (
        <View style={styles.bottomMenuContainer}>   
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('DirectoryScreen')}>
                <AntDesign name="bars" size={32} color="black" />
                <Text style={styles.label}>Atlas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('PhotosScreen')}>
            <Fontisto name="photograph" size={32} color="black" />
                <Text style={styles.label}>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabCentered} onPress={() => handlePress('HomeScreen')}>
                <View style={styles.centeredIconContainer}>
                <FontAwesome5 name="camera" size={38} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('HistoryScreen')}>
            <Entypo name="back-in-time" size={32} color="black" />
                <Text style={styles.label}>Historia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('AccountScreen')}>
            <FontAwesome5 name="user-alt" size={32} color="black" />
                <Text style={styles.label}>Konto</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomMenu;
