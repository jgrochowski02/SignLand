import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import RegisterComponent from '../../components/RegisterComponent';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                SplashScreen.preventAutoHideAsync(); 
                
                await Asset.loadAsync([
                    require('../../assets/icons/BackgroundLogin.jpg'),
                    require('../../assets/icons/BlackE-mail.png'),
                    require('../../assets/icons/lockPadlock.png'),
                ]);
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                SplashScreen.hideAsync();
            }
        };

        prepare();
    }, []);

    const handleRegister = async () => {
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Błąd walidacji', 'Podaj poprawny adres e-mail.');
            return;
        }
        if (password.length < 6 || password !== confirmPassword) {
            Alert.alert('Błąd walidacji', 'Hasło jest za krótkie lub niezgodne.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Sukces', 'Rejestracja zakończona sukcesem');
            navigation.navigate('LoginScreen');
        } catch (error) {
            let errorMessage = 'Wystąpił problem podczas rejestracji. Spróbuj ponownie.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Ten adres e-mail jest już zarejestrowany.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Podany adres e-mail jest nieprawidłowy.';
            }
            Alert.alert('Błąd rejestracji', errorMessage);
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('LoginScreen');
    };

    if (!appIsReady) {
        return null; 
    }

    return (
        <View style={{ flex: 1 }}>
            <RegisterComponent
                onRegister={handleRegister}
                onNavigateToLogin={navigateToLogin}
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
