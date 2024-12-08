import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotosGallery = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      if (onImageSelected) {
        // onImageSelected(selectedImageUri);
      }
    }
  };

  const recognizeSign = () => {
    if (image) {
      // Logika rozpoznawania znaku lub testowy alert
      Alert.alert('Rozpoznawanie znaku', 'Funkcja rozpoznawania znaku wkrótce dostępna.');
    } else {
      Alert.alert('Brak obrazu', 'Najpierw wybierz zdjęcie.');
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
    marginTop: 20
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
