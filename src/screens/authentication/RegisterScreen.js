// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import RegisterComponent from '../../components/RegisterComponent';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Logika rejestracji
        if (password !== confirmPassword) {
            Alert.alert('Błąd', 'Hasła muszą się zgadzać.');
            return;
        }

        
        console.log('Imię:', name);
        console.log('E-mail:', email);
        console.log('Hasło:', password);
        Alert.alert('Rejestracja', `Imię: ${name}\nE-mail: ${email}\nHasło: ${password}`);
        navigation.navigate('LoginScreen'); 
    };

    return (
        <View style={{ flex: 1 }}>
            <RegisterComponent
                onRegister={handleRegister}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
            />
        </View>
    );
};

export default RegisterScreen;
