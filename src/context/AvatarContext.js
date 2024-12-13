import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarUri, setAvatarUri] = useState(require('../assets/avatars/avatar1.png'));

  const loadAvatar = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem('avatarUri');
      if (storedAvatar) {
        setAvatarUri(storedAvatar); // Nie opakowujemy w { uri } tutaj
      }
    } catch (error) {
      console.error('Error loading avatar from AsyncStorage:', error);
    }
  };

  const saveAvatar = async (uri) => {
    try {
      await AsyncStorage.setItem('avatarUri', uri);
      setAvatarUri(uri); // Ustawiamy `uri` bez dodatkowego opakowania
    } catch (error) {
      console.error('Error saving avatar to AsyncStorage:', error);
      throw new Error('Nie udało się zapisać zmiany avatara.');
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarUri, setAvatarUri: saveAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  return useContext(AvatarContext);
};
