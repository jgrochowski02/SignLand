import React, { useState, useEffect, useRef } from "react";
import  Camera  from "expo-camera"; // Poprawny import
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as FileSystem from "expo-file-system";

export default function Cam({ goToProgress }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [photoName, setPhotoName] = useState('');
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    // Zarządzanie uprawnieniami
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync();
                const fileName = `photo_${Date.now()}.jpg`;
                setPhotoName(fileName);

                const folderName = "photos";
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
    };

    if (hasPermission === null) {
        return <View><Text>Proszę czekać na uprawnienia...</Text></View>;
    }

    if (!hasPermission) {
        return <View><Text>Brak dostępu do kamery</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
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
                    <Button
                        title="Zrób zdjęcie"
                        onPress={takePicture}
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
});
