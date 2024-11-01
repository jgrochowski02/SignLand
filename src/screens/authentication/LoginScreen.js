import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import LoginComponent from '../../components/LoginComponent';
import { useUserContext } from '../../context/UserContext';

const LoginScreen = () => {
    const navigation = useNavigation(); 
    const { loginAsGuest } = useUserContext();

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

    const handleGuestAccess = () => {
        loginAsGuest();
        navigation.navigate('DirectoryScreen');
    };

    return (
        <View style={{ flex: 1 }}>
            <LoginComponent 
                onLogin={handleLogin} 
                onRegister={() => navigation.navigate('RegisterScreen')} 
                onGuestAccess={handleGuestAccess} 
            />
        </View>
    );
};

export default LoginScreen;
