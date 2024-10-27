import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LoginComponent from '../../components/LoginComponent';

const LoginScreen = () => {
    const navigation = useNavigation(); 

    const handleLogin = (email, password) => {
        // Logika logowania (przykładowa)
        console.log('E-mail:', email);
        console.log('Hasło:', password);
        
        // Wyświetl alert z danymi logowania
        Alert.alert('Logowanie', `E-mail: ${email}\nHasło: ${password}`, [
            {
                text: 'OK',
                onPress: () => {
                    
                    navigation.navigate('HomeScreen');
                },
            },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            <LoginComponent onLogin={handleLogin} onRegister={() => navigation.navigate('RegisterScreen')} />
        </View>
    );
};

export default LoginScreen;
