import React, { useState, useEffect, useRef } from "react";
import { Camera } from 'expo-camera/legacy';

import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as FileSystem from "expo-file-system";

export default function Cam({ goToProgress }) {
    const [type, setType] = useState(Camera.Constants.Type.back); // Używamy Camera.Constants.Type
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photoName, setPhotoName] = useState('');
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null); // Używamy useRef do przechowywania referencji

    useEffect(() => {
        const askForPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === "granted") {
                // Permission granted
            } else {
                // Handle permission denied
                console.log("Permission denied");
            }
        };
        askForPermission();
    }, []);

    function toggleCameraType() {
        setType((current) =>
            current === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync();
                const fileName = `photo_${Date.now()}.jpg`;
                setPhotoName(fileName);

                const folderName = "photos"; // Nazwa folderu
                const folderUri = `${FileSystem.documentDirectory}${folderName}/`;
                const fileUri = `${folderUri}${fileName}`;

                const folderExists = await FileSystem.getInfoAsync(folderUri);
                if (!folderExists.exists) {
                    await FileSystem.makeDirectoryAsync(folderUri, {
                        intermediates: true,
                    });
                }

                await FileSystem.copyAsync({
                    from: uri,
                    to: fileUri,
                });

                console.log("Zdjęcie zapisane w folderze:", fileUri);
                setPhotoUri(uri);

            } catch (error) {
                console.error("Błąd podczas robienia zdjęcia:", error);
            }
        }
    }

    if (!permission) {
        return <View><Text>Proszę czekać na uprawnienia...</Text></View>;
    }

    if (!permission.granted) {
        return <View><Text>Brak dostępu do kamery</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
            />
            {photoUri ? (
                <Image
                    source={{ uri: photoUri }}
                    style={styles.previewImage}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Odwróć kamerkę</Text>
                    </TouchableOpacity>
                    <Button
                        onPress={takePicture}
                        title="Zrób zdjęcie i zapisz"
                    />
                </View>
            )}
            {photoUri && (
                <View style={styles.buttonContainer}>
                    <Button
                        title="Zapisz"
                        onPress={() => goToProgress(photoName)}
                    />
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    previewImage: {
        width: 350,
        height: 610,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#16151A",
    },
    button: {
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
})