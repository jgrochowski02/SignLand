import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCc2LpADXVO44n3d_HVzU93VrSj-0V_gjA",
    authDomain: "signland-94bdd.firebaseapp.com",
    projectId: "signland-94bdd",
    storageBucket: "signland-94bdd.appspot.com",
    messagingSenderId: "280341993961",
    appId: "1:280341993961:web:4d0c90fc657c6b5404d378",
    measurementId: "G-60CM4MFT6W"
  };

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
