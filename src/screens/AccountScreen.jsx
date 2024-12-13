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
import { MaterialIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
  const { avatarUri, setAvatarUri } = useAvatar(); 

  const handleEditData = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const handleChangeAvatar = () => {
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
      <Header title="KONTO" />
      <AvatarDisplay avatarUri={avatarUri} /> 
      <UserInfo />
      <UserChoice title="Zmiana hasła" iconName="edit" onPress={handleEditData} />
      <UserChoice title="Zmiana awatara" iconName="account-box" onPress={handleChangeAvatar} />
      <UserChoice title="Pomoc" iconName="help-outline" onPress={handleHelp} />
      <UserChoice title="Wyloguj" iconName="logout" onPress={handleLogout} />
      <BottomMenu navigation={navigation} />
    </View>
  );
};

export default AccountScreen;
