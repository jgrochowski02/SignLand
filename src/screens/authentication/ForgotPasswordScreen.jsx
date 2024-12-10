import React from 'react';
import { View, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
import ForgotPasswordComponent from '../../components/ForgotPasswordComponent';

const ForgotPasswordScreen = () => {
  const handlePasswordReset = async (email) => {
    if (!email) {
      Alert.alert('Błąd', 'Podaj adres e-mail.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sukces', 'E-mail resetujący hasło został wysłany.');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Nie znaleziono użytkownika o podanym adresie e-mail.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Podano nieprawidłowy adres e-mail.';
          break;
        default:
          errorMessage = 'Wystąpił problem podczas resetowania hasła.';
      }
      Alert.alert('Błąd', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ForgotPasswordComponent onPasswordReset={handlePasswordReset} />
    </View>
  );
};

export default ForgotPasswordScreen;
