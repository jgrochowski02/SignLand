import React from 'react';
import { View, Alert } from 'react-native';
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebaseConfig';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import UserChoice from '../components/UserChoice'; 
import styles from '../utils/styles';
import AvatarDisplay from '../components/AvatarDisplay';
import { useAvatar } from '../context/AvatarContext';
import ChangePasswordScreen from './ChangePasswordScreen';
import {MaterialIcons, } from '@expo/vector-icons/';

const AccountScreen = ({ navigation }) => {
  const { avatarUri } = useAvatar(); 

  const handleEditData = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const handleSettings = () => {
    navigation.navigate('SettingsScreen'); 
  };

  const handleHelp = () => {
    navigation.navigate('HelpScreen'); 
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigation.navigate('LoginScreen'); 
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas wylogowywania. Spróbuj ponownie.'); 
    }
  };

  return (
    <View style={styles.containerNoCenter}>
      <Header title="PROFIL" />
      <AvatarDisplay avatarUri={avatarUri} /> 
      <UserInfo />
      <UserChoice title="Zmiana hasła" iconName="edit" onPress={handleEditData} />
      <UserChoice title="Ustawienia" iconName="settings" onPress={handleSettings} />
      <UserChoice title="Pomoc" iconName="question-mark" onPress={handleHelp} />
      <UserChoice title="Wyloguj" iconName="logout" onPress={handleLogout} />
      <BottomMenu navigation={navigation} />
    </View>
  );
  
};

export default AccountScreen;
