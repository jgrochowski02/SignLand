import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

const SignDetailScreen = ({ route, navigation }) => {
    const { sign } = route.params;

const capitalizeFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};



    return (
        <View style={styles.container}>
            <Header title="OPIS ZNAKU" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
               
                <Image source={{ uri: sign.imageUrl }} style={styles.image} />
                
               
                <Text style={styles.code}>{capitalizeFirstLetter(sign.name)}</Text>

                
          
                <Text style={styles.title}>{sign.title || 'Brak nazwy'}</Text>
                
               
                <Text style={styles.description}>{sign.description || 'Brak opisu'}</Text>
            </ScrollView>
            <BottomMenu navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    code: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#555',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify', 
        color: '#777',
    },
});

export default SignDetailScreen;
