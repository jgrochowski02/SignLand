import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import styles from '../utils/styles';
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
                <Image source={require('../assets/icons/list.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Atlas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress('PhotosScreen')}>
                <Image source={require('../assets/icons/gallery.png')} style={styles.BottomMenuicon} />
                <Text style={styles.label}>Galeria</Text>
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
