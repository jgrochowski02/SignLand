import tensorflow as tf
from tensorflow import keras
import numpy as np

# Ścieżka do zapisanego modelu
model_path = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\models\traffic_sign_model.keras"

# Wczytywanie modelu
model = keras.models.load_model(model_path)
print("Model loaded successfully")

# Tworzenie datasetu z danych testowych
test_dir = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\data\test-signs"
test_dataset = tf.keras.utils.image_dataset_from_directory(
    test_dir,
    image_size=(150, 150),
    batch_size=32
)

# Ocena modelu
print("Evaluating model...")
loss, accuracy = model.evaluate(test_dataset)
print(f"Test Accuracy: {accuracy * 100:.2f}%")
