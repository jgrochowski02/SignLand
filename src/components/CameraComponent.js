import React, { useRef, useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';
import styles from '../utils/styles'; 

const CameraComponent = () => {
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      Alert.alert("Photo taken", "Your photo was successfully captured!", [
        { text: "OK" }
      ]);
      console.log(photo.uri); 
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        zoom={zoom}
      >
        <View style={styles.cameraControls}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            value={zoom}
            onValueChange={(value) => setZoom(value)}
          />
          <Button title="Zrób zdjęcie" onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;
