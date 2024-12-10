import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import loadModel from '../tensorflow/loadModel'; // Funkcja do ładowania modelu

const PhotosGallery = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Ładowanie modelu TensorFlow
  useEffect(() => {
    (async () => {
      await tf.ready(); // Upewnij się, że TensorFlow jest gotowe
      const loadedModel = await loadModel(); // Załaduj model z pliku
      setModel(loadedModel);
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      if (onImageSelected) {
       // onImageSelected(selectedImageUri);
      }
    }
  };

  // Przetwarzanie obrazu na tensor
  const processImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const imageData = await response.blob();
    const image = await tf.browser.fromPixelsAsync(imageData);
    const resizedImage = image.resizeNearestNeighbor([150, 150]).toFloat();
    const normalizedImage = resizedImage.div(255.0);
    return normalizedImage.expandDims(0); // Dodanie wymiaru batch
  };

  // Klasyfikacja obrazu
  const recognizeSign = async () => {
    if (!image) {
      Alert.alert('Brak obrazu', 'Najpierw wybierz zdjęcie.');
      return;
    }

    if (!model) {
      Alert.alert('Model niezaładowany', 'Model sieci neuronowej nie został jeszcze załadowany.');
      return;
    }

    try {
      const tensor = await processImage(image);
      const predictions = model.predict(tensor);
      const predictedIndex = predictions.argMax(-1).dataSync()[0];

      
      const classNames = [
        'A1', 'A10', 'A11', 'A11a', 'A12a', 'A12b', 'A12c', 'A14', 'A16', 'A17',
        'A18b', 'A2', 'A20', 'A21', 'A22', 'A23', 'A24', 'A25', 'A26', 'A29',
        'A3', 'A30', 'A31', 'A32', 'A4', 'A5', 'A6a', 'A6b', 'A6c', 'A6d',
        'A6e', 'A7', 'A8', 'A9', 'B1', 'B15', 'B16', 'B17', 'B18', 'B2', 'B20',
        'B21', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27', 'B29', 'B30', 'B31',
        'B33', 'B35', 'B36', 'B41', 'B42', 'B43', 'B44', 'C1', 'C10', 'C11',
        'C12', 'C13', 'C13a', 'C2', 'C3', 'C4', 'C5', 'C8', 'C9', 'D1', 'D10',
        'D11', 'D12', 'D15', 'D18', 'D18a', 'D19', 'D2', 'D20', 'D21', 'D3',
        'D35', 'D36', 'D40', 'D41', 'D42', 'D43', 'D44', 'D46', 'D47', 'D4a',
        'D4b', 'D5', 'D51a', 'D51b', 'D6', 'D6a', 'D6b', 'D7', 'D8', 'D9',
      ];

      setPrediction(classNames[predictedIndex]);
      Alert.alert('Rozpoznany znak', `Ten znak to: ${classNames[predictedIndex]}`);
    } catch (error) {
      console.error('Error during prediction:', error);
      Alert.alert('Błąd', 'Nie udało się rozpoznać znaku.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Wybierz zdjęcie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={recognizeSign}>
          <Text style={styles.buttonText}>Rozpoznaj znak</Text>
        </TouchableOpacity>
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
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PhotosGallery;
