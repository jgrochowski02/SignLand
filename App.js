import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/Stack';
import { AvatarProvider } from './src/context/AvatarContext';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import './src/firebaseConfig';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <AvatarProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
      </AvatarProvider>
  );
};

export default App;
