import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

const SignsScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const [signs, setSigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(`Fetching signs for category: ${category}`);
        fetch(`http://192.168.0.104:5000/api/signs/${encodeURIComponent(category)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSigns(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching signs:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Błąd podczas ładowania: {error}</Text>
            </View>
        );
    }

    if (signs.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>Brak znaków w tej kategorii</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Header title="ZNAKI" />
            <FlatList
    data={signs}
    keyExtractor={(item) => item.name}
    renderItem={({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
                navigation.navigate('SignDetailScreen', {
                    sign: {
                        name: item.name, 
                        imageUrl: `http://192.168.0.104:5000${item.url}`, 
                        description: 'Niebezpieczny zakręt w prawo. Ostrzega o niebezpiecznym zakręcie w kierunku wskazanym na znaku. Zobowiązuje uczestników ruchu do zachowania szczególnej ostrożności.', // Przykładowy opis
                    },
                })
            }
        >
            <Image source={{ uri: `http://192.168.0.104:5000${item.url}` }} style={styles.icon} resizeMode="contain"/>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    )}
/>

            <BottomMenu navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    infoText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
    },
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

export default SignsScreen;