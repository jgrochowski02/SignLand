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
import { useAvatar } from '../context/AvatarContext'; // Importuj kontekst

const AccountScreen = ({ navigation }) => {
  const { avatarUri } = useAvatar(); // Uzyskaj avatar z kontekstu

  const handleEditData = () => {
    navigation.navigate('EditDataScreen'); 
  };

  const handleSettings = () => {
    navigation.navigate('SettingsScreen'); 
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen'); 
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
      <UserChoice title="Edytuj dane" icon={require('../assets/icons/editing.png')} onPress={handleEditData} />
      <UserChoice title="Ustawienia" icon={require('../assets/icons/setting.png')} onPress={handleSettings} />
      <UserChoice title="Polityka prywatności" icon={require('../assets/icons/padlock.png')} onPress={handlePrivacyPolicy} />
      <UserChoice title="Wyloguj" icon={require('../assets/icons/logout.png')} onPress={handleLogout} />
      <BottomMenu navigation={navigation} />
    </View>
  );
};

export default AccountScreen;
