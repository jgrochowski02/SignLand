import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";

const PhotosGallery = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageAssetUri, setImageAssetUri] = useState(null);

  
  useEffect(() => {
    pickImageFromGallery();
  }, []);

  const pickImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Brak uprawnień do dostępu do galerii!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log("Wynik ImagePicker:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("URI wybranego obrazu:", uri);
      setImageUri(uri);

      // Ładuj obraz jako Asset
      const imageAsset = await Asset.fromURI(uri).downloadAsync();
      console.log("imageAsset:", imageAsset);
      setImageAssetUri(imageAsset.localUri || imageAsset.uri);
    } else {
      console.log("Brak wybranych zasobów lub anulowano wybór.");
    }
  };

  const recognizeSign = () => {
    console.log('Przycisk "Rozpoznaj znak" został naciśnięty');
  };

  console.log("imageUri podczas renderowania:", imageUri);
  console.log("imageAssetUri podczas renderowania:", imageAssetUri);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!imageAssetUri ? (
          <Image
          
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: imageAssetUri }} style={styles.image} />
        )}

        {imageAssetUri && (
          <TouchableOpacity
            style={styles.recognizeButton}
            onPress={recognizeSign}
          >
            <Text style={styles.recognizeButtonText}>
              Rozpoznaj znak
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.chooseImageButton}
          onPress={pickImageFromGallery}  
        >
          <Text style={styles.chooseImageButtonText}>Wybierz zdjęcie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginVertical: 8,
  },
  recognizeButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: "80%",
  },
  recognizeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  chooseImageButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  chooseImageButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PhotosGallery;