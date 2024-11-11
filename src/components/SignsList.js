import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const signsData = [
    { id: '1', name: 'Znaki ostrzegawcze', icon: require('../assets/icons/warning.png'), screen: 'SignDetailScreen1' },
    { id: '2', name: 'Znaki zakazu', icon: require('../assets/icons/prohibition.png'), screen: 'SignDetailScreen2' },
    { id: '3', name: 'Znaki nakazu', icon: require('../assets/icons/mandatory.png'), screen: 'SignDetailScreen2' },
    { id: '4', name: 'Znaki informacyjne', icon: require('../assets/icons/informative.png'), screen: 'SignDetailScreen2' },
    { id: '5', name: 'Znaki kierunku', icon: require('../assets/icons/direction.png'), screen: 'SignDetailScreen2' },
    { id: '6', name: 'Znaki uzupełniające', icon: require('../assets/icons/complementary.png'), screen: 'SignDetailScreen2' },
    { id: '7', name: 'Tabliczki do znaków', icon: require('../assets/icons/addiction.png'), screen: 'SignDetailScreen2' },
    { id: '8', name: 'Znaki kolejowe', icon: require('../assets/icons/railway.png'), screen: 'SignDetailScreen2' },
];

const SignsList = ({ navigation }) => {
    return (
        <FlatList
            data={signsData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate(item.screen)}
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
