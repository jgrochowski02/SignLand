import tensorflow as tf

# Wczytaj model
model_path = "models/traffic_sign_model.keras"
model = tf.keras.models.load_model(model_path)

# Ścieżka do zapisu modelu w formacie TensorFlow Lite
tflite_model_path = "models/traffic_sign_model.tflite"

# Konwersja do TensorFlow Lite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Zapisanie modelu
with open(tflite_model_path, "wb") as f:
    f.write(tflite_model)

print(f"TensorFlow Lite model saved at {tflite_model_path}")
