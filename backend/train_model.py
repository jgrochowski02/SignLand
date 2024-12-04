import tensorflow as tf
import os

# Ścieżki do lokalnych katalogów
LOCAL_TRAIN_DIR = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\data\train-signs"
LOCAL_VALIDATION_DIR = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\data\validation-signs"

# Tworzenie datasetów TensorFlow z lokalnych katalogów
print("Creating training dataset...")
train_dataset = tf.keras.utils.image_dataset_from_directory(
    LOCAL_TRAIN_DIR,
    image_size=(150, 150),  # Rozmiar obrazu
    batch_size=32          # Rozmiar partii
)

print("Creating validation dataset...")
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    LOCAL_VALIDATION_DIR,
    image_size=(150, 150),
    batch_size=32
)

# Wyświetlanie klas
class_names = train_dataset.class_names
print(f"Classes in training dataset: {class_names}")
num_classes = len(class_names)

# Upewnij się, że walidacja ma te same klasy
val_class_names = validation_dataset.class_names
print(f"Classes in validation dataset: {val_class_names}")

if sorted(class_names) != sorted(val_class_names):
    raise ValueError("Mismatch in classes between training and validation datasets.")

# Log sprawdzenia poprawności
print(f"Number of classes in training dataset: {len(class_names)}")
print(f"Number of classes in validation dataset: {len(val_class_names)}")

# Optymalizacja ładowania danych
AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)

# Budowanie modelu CNN
print("Building CNN model...")
model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1./255, input_shape=(150, 150, 3)), 
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(len(class_names), activation='softmax')  # Wyjście dopasowane do liczby klas
])

# Kompilacja modelu
print("Compiling model...")
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Trenowanie modelu
print("Training model...")
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=10  # Możesz dostosować liczbę epok
)

# Zapisywanie modelu
model_save_path = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\models\traffic_sign_model.keras"
model.save(model_save_path)
print(f"Model saved at {model_save_path}")
