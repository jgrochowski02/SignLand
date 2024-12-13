import tensorflow as tf

model_path = "models/traffic_sign_model.keras"
model = tf.keras.models.load_model(model_path)

tflite_model_path = "models/traffic_sign_model.tflite"

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open(tflite_model_path, "wb") as f:
    f.write(tflite_model)

print(f"TensorFlow Lite model saved at {tflite_model_path}")
