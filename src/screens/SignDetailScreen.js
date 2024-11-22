import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SignDetailScreen = ({ route }) => {
    const { sign } = route.params; // Odbierz dane o znaku przekazane przez nawigację

    return (
        <View style={styles.container}>
            {/* Wyświetlenie obrazu znaku */}
            <Image source={{ uri: sign.imageUrl }} style={styles.image} />

            {/* Wyświetlenie informacji o znaku */}
            <Text style={styles.title}>{sign.name}</Text>
            <Text style={styles.description}>{sign.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '80%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
});

export default SignDetailScreen;
