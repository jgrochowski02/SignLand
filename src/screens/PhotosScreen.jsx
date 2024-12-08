import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import PhotosGallery from '../components/PhotosGallery';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import styles from '../utils/styles';

const PhotosScreen = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelected = (imageUri) => {
      setSelectedImage(imageUri); // Możesz dodać dodatkową logikę do obsługi wybranego obrazu
    };

    return (
      <View style={styles.containerNoCenter}>
              <Header title="GALERIA" />
              <PhotosGallery onImageSelected={handleImageSelected} />
              {selectedImage && <Text style={styles.selectedImageText}>Selected Image: {selectedImage}</Text>}
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default PhotosScreen;
