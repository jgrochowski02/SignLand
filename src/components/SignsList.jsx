import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const signsData = [
    { id: '1', name: 'Znaki ostrzegawcze', icon: require('../assets/icons/warning.png'), folder: 'warning', screen: 'SignsScreen' },
    { id: '2', name: 'Znaki zakazu', icon: require('../assets/icons/prohibition.png'), folder: 'prohibition', screen: 'SignsScreen' },
    { id: '3', name: 'Znaki nakazu', icon: require('../assets/icons/mandatory.png'), folder: 'mandatory', screen: 'SignsScreen' },
    { id: '4', name: 'Znaki informacyjne', icon: require('../assets/icons/informative.png'), folder: 'informative', screen: 'SignsScreen' },
    { id: '5', name: 'Znaki kierunku', icon: require('../assets/icons/direction.png'), folder: 'direction', screen: 'SignsScreen' },
    { id: '6', name: 'Znaki uzupełniające', icon: require('../assets/icons/complementary.png'), folder: 'complementary', screen: 'SignsScreen' },
    { id: '7', name: 'Tabliczki do znaków', icon: require('../assets/icons/addiction.png'), folder: 'addiction', screen: 'SignsScreen' },
    { id: '8', name: 'Znaki kolejowe', icon: require('../assets/icons/railway.png'), folder: 'railway', screen: 'SignsScreen' },
];


const SignsList = ({ navigation }) => {
    return (
        <FlatList
            data={signsData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate(item.screen, { category: item.folder })}
                >
                    <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                    <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};


const styles = StyleSheet.create({
    itemContainer: {
   
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    icon: {
        width: 58, 
        height: 58,
        marginRight: 26,
    },
    itemText: {
        fontSize: 28,
        flex: 1, 
        textAlign: 'center', 
    },
});

export default SignsList;
