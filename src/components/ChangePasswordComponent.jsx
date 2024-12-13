import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from '../utils/styles';

const ChangePasswordComponent = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleReauthenticate = async () => {
    const user = auth.currentUser;
    if (user && currentPassword) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        Alert.alert('Błąd', 'Autoryzacja nie powiodła się. Sprawdź swoje obecne hasło.');
        return false;
      }
    }
    Alert.alert('Błąd', 'Wprowadź swoje obecne hasło.');
    return false;
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Błąd', 'Nowe hasła muszą być identyczne.');
      return;
    }

    const reauthenticated = await handleReauthenticate();
    if (reauthenticated && newPassword) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        Alert.alert('Sukces', 'Hasło zaktualizowane pomyślnie');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Błąd', 'Aktualizacja hasła nie powiodła się.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../assets/icons/background1.jpg')}
        style={styles.containerLogin}
      >
        <View style={styles.overlay}>
          <View style={styles.inputLoginContainer}>
            <Image
              source={require('../assets/icons/unlockPadlock.png')}
              style={styles.iconLogin}
            />
            <TextInput
              placeholder="Obecne Hasło"
              placeholderTextColor="#000"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.inputLogin}
            />
          </View>

          <View style={styles.inputLoginContainer}>
            <Image
              source={require('../assets/icons/lockPadlock.png')}
              style={styles.iconLogin}
            />
            <TextInput
              placeholder="Nowe Hasło"
              placeholderTextColor="#000"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.inputLogin}
            />
          </View>

          <View style={styles.inputLoginContainer}>
            <Image
              source={require('../assets/icons/lockPadlock.png')}
              style={styles.iconLogin}
            />
            <TextInput
              placeholder="Powtórz Nowe Hasło"
              placeholderTextColor="#000"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
              style={styles.inputLogin}
            />
          </View>

          <TouchableOpacity style={styles.buttonLogin} onPress={handleUpdatePassword}>
            <Text style={styles.buttonTextLogin}>Zaktualizuj Hasło</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordComponent;
