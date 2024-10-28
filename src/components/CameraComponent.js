import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as FileSystem from "expo-file-system";

export default function CameraComponent({ goToProgress }) {
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null); // Użycie ref

    useEffect(() => {
        const askForPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        askForPermission();
    }, []);

    const toggleCameraType = () => {
        setType((current) => 
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync();
                const fileName = `photo_${Date.now()}.jpg`;
                const folderName = "photos";
                const folderUri = `${FileSystem.documentDirectory}${folderName}/`;
                const fileUri = `${folderUri}${fileName}`;

                const folderExists = await FileSystem.getInfoAsync(folderUri);
                if (!folderExists.exists) {
                    await FileSystem.makeDirectoryAsync(folderUri, {
                        intermediates: true,
                    });
                }

                await FileSystem.moveAsync({
                    from: uri,
                    to: fileUri,
                });

                console.log("Zdjęcie zapisane w folderze:", fileUri);
                setPhotoUri(fileUri); // Ustawiamy URI zapisanej fotografii
            } catch (error) {
                console.error("Błąd podczas robienia zdjęcia:", error);
            }
        }
    };

    if (hasPermission === null) {
        return <View><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
                        title="Zrób zdjęcie"
                    />
                </View>
            )}
            {photoUri && (
                <View style={styles.buttonContainer}>
                    <Button
                        title="Zapisz i kontynuuj"
                        onPress={() => goToProgress(photoUri)} // Przechodzimy dalej z URI zdjęcia
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
});
