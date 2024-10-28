import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import LoginComponent from '../../components/LoginComponent';

const LoginScreen = () => {
    const navigation = useNavigation(); 

    const handleLogin = async (email, password) => {
        try {
            
            await signInWithEmailAndPassword(auth, email, password);
           
            navigation.navigate('HomeScreen');
        } catch (error) {
            
            let errorMessage;
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Nie znaleziono użytkownika o podanym adresie e-mail.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Nieprawidłowe hasło.';
                    break;
                default:
                    errorMessage = 'Wystąpił problem podczas logowania. Spróbuj ponownie.';
            }
            Alert.alert('Błąd logowania', errorMessage);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <LoginComponent onLogin={handleLogin} onRegister={() => navigation.navigate('RegisterScreen')} />
        </View>
    );
};

export default LoginScreen;
