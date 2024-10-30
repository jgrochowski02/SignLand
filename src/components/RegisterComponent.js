// src/components/RegisterComponent.js
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, TextInput, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import styles from '../utils/styles';

const RegisterComponent = ({ onRegister, name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require('../assets/icons/BackgroundLogin.jpg')} 
                style={styles.containerLogin}
            >
                <View style={styles.overlay}> 
                    
                    <View style={styles.inputLoginContainer}>
                        <Image
                            source={require('../assets/icons/mail.png')} 
                            style={styles.iconLogin}
                        />
                        <TextInput
                            placeholder="E-mail"
                            placeholderTextColor="#000" 
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputLogin}
                            onFocus={() => setEmail('')} 
                        />
                    </View>

                    <View style={styles.inputLoginContainer}>
                        <Image
                            source={require('../assets/icons/padlock.png')}
                            style={styles.iconLogin}
                        />
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

                  
                    <View style={styles.inputLoginContainer}>
                        <Image
                            source={require('../assets/icons/padlock.png')} 
                            style={styles.iconLogin}
                        />
                        <TextInput
                            placeholder="Potwierdź Hasło"
                            placeholderTextColor="#000" 
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.inputLogin}
                            onFocus={() => setConfirmPassword('')} 
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.buttonLogin} onPress={onRegister}>
                        <Text style={styles.buttonTextLogin}>Zarejestruj</Text>
                    </TouchableOpacity>

                   
                    <TouchableOpacity style={styles.register} onPress={onRegister}>
                        <Text style={[styles.link, { fontSize: 30 }]}>Zaloguj się</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default RegisterComponent;
