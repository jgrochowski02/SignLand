import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import RegisterComponent from '../../components/RegisterComponent';

const RegisterScreen = () => {
    const navigation = useNavigation(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        
        if (!email.includes('@')) {
            Alert.alert('Błąd walidacji', 'Adres e-mail musi zawierać znak @.');
            return;
        }
        if (!email.includes('.')) {
            Alert.alert('Błąd walidacji', 'Adres e-mail musi zawierać znak "."');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Błąd walidacji', 'Hasło musi mieć co najmniej 6 znaków.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Błąd walidacji', 'Hasła muszą się zgadzać.');
            return;
        }

        try {
           
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Sukces', 'Rejestracja zakończona sukcesem');
            navigation.navigate('LoginScreen');
        } catch (error) {
            
            let errorMessage;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Ten adres e-mail jest już zarejestrowany.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Podany adres e-mail jest nieprawidłowy.';
                    break;
                default:
                    errorMessage = 'Wystąpił problem podczas rejestracji. Spróbuj ponownie.';
            }
            Alert.alert('Błąd rejestracji', errorMessage);
        }
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
