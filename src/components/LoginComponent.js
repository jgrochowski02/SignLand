// src/components/LoginComponent.js
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, TextInput, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import styles from '../utils/styles';

const LoginComponent = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require('../assets/BackgroundLogin.jpg')} 
                style={styles.containerLogin}
            >
                <View style={styles.overlay}> 
                    <Image
                        source={require('../assets/mail.png')} 
                        style={styles.iconLogin}
                    />
                    <View style={styles.inputLoginContainer}>
                        <TextInput
                            placeholder="E-mail"
                            placeholderTextColor="#000" 
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputLogin}
                            onFocus={() => setEmail('')} 
                        />
                    </View>
                    <Image
                        source={require('../assets/padlock.png')}
                        style={styles.iconLogin}
                    />
                    <View style={styles.inputLoginContainer}>
                        <TextInput
                            placeholder="Hasło"
                            placeholderTextColor="#000" 
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.inputLogin}
                            onFocus={() => setPassword('')} 
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => onLogin(email, password)}>
                        <Text style={styles.buttonTextLogin}>Zaloguj</Text>
                    </TouchableOpacity>
                    
                   
                    <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Akcja po kliknięciu "Zapomniałeś hasła?" */}}>
                        <Text style={styles.link}>Zapomniałeś hasła?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.register} onPress={onRegister}>
                        <Text style={[styles.link, { fontSize: 35 }]}>Zarejestruj</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default LoginComponent;