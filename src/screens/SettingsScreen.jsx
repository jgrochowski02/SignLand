import React from 'react';
import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useAvatar } from '../context/AvatarContext'; // Importuj kontekst

const SettingsScreen = ({ navigation }) => {
  const { setAvatarUri } = useAvatar(); // Uzyskaj setAvatarUri z kontekstu

  const avatars = [
    require('../assets/avatars/avatar1.png'),
    require('../assets/avatars/avatar2.png'),
    require('../assets/avatars/avatar3.png'),
    require('../assets/avatars/avatar4.png'),
    require('../assets/avatars/avatar5.png'),
    require('../assets/avatars/avatar6.png'),
    require('../assets/avatars/avatar7.png'),
    require('../assets/avatars/avatar8.png'),
    require('../assets/avatars/avatar9.png'),
    require('../assets/avatars/avatar10.png'),
    require('../assets/avatars/avatar11.png'),
    require('../assets/avatars/avatar12.png'),
  ];

  const handleSelectAvatar = (avatar) => {
    setAvatarUri(avatar);
    Alert.alert('Sukces', 'Avatar został zmieniony.');
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Header title="USTAWIENIA" />
      <View style={styles.avatarsContainer}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectAvatar(avatar)} style={styles.avatarWrapper}>
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 20,
  },
  avatarWrapper: {
    margin: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default SettingsScreen;
