import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, TouchableWithoutFeedback, Keyboard, Image, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from '../utils/styles'; 

const ForgotPasswordComponent = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async () => {
        if (!email.includes('@') || !email.includes('.')){
            Alert.alert('Błąd walidacji', 'Proszę podać prawidłowy adres e-mail.');
            return; 
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sukces', 'Link do resetowania hasła został wysłany na podany adres e-mail.');
            navigation.navigate('LoginScreen');
            return; 
        } catch (error) {
            Alert.alert('Błąd', 'Wystąpił problem podczas wysyłania e-maila. Spróbuj ponownie.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require('../assets/icons/BackgroundLogin.jpg')}
                style={styles.containerLogin} 
            >
                <View style={styles.overlay}>
                    <Text style={[styles.title, { marginBottom: 30, fontSize: 40 }]}>Zresetuj hasło</Text>
                    
                    <View style={styles.inputLoginContainer}>
                        <Image
                            source={require('../assets/icons/BlackE-mail.png')} 
                            style={styles.iconLogin}
                        />
                        <TextInput
                            placeholder="Wprowadź swój e-mail"
                            placeholderTextColor="#000"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputLogin}
                            keyboardType="email-address"
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.buttonLogin} onPress={handlePasswordReset}>
                        <Text style={styles.buttonTextLogin}>Wyślij link resetujący</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default ForgotPasswordComponent;
