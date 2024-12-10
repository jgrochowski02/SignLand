import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

async function loadModel() {
  await tf.ready();
  const modelPath = `${FileSystem.documentDirectory}models/traffic_sign_model.keras`;
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  console.log('Model loaded successfully');
  return model;
}

export default loadModel;
