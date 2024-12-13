import tensorflow as tf
import os

LOCAL_TRAIN_DIR = "data/train-signs"
LOCAL_VALIDATION_DIR = "data/validation-signs"

# Tworzenie datasetów TensorFlow z lokalnych katalogów
print("Creating training dataset...")
train_dataset = tf.keras.utils.image_dataset_from_directory(
    LOCAL_TRAIN_DIR,
    image_size=(150, 150), 
    batch_size=32         
)

print("Creating validation dataset...")
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    LOCAL_VALIDATION_DIR,
    image_size=(150, 150),
    batch_size=32
)

class_names = train_dataset.class_names
print(f"Classes in training dataset: {class_names}")
num_classes = len(class_names)

val_class_names = validation_dataset.class_names
print(f"Classes in validation dataset: {val_class_names}")

if sorted(class_names) != sorted(val_class_names):
    raise ValueError("Mismatch in classes between training and validation datasets.")

print(f"Number of classes in training dataset: {len(class_names)}")
print(f"Number of classes in validation dataset: {len(val_class_names)}")


AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)

# Budowanie modelu CNN
print("Building CNN model...")
model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1./255, input_shape=(150, 150, 3)),  # Normalizacja
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),         # Pierwsza warstwa konwolucyjna
    tf.keras.layers.MaxPooling2D((2, 2)),                          # Pierwsza warstwa pooling
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),         # Druga warstwa konwolucyjna
    tf.keras.layers.MaxPooling2D((2, 2)),                          # Druga warstwa pooling
    tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),        # Trzecia warstwa konwolucyjna
    tf.keras.layers.MaxPooling2D((2, 2)),                          # Trzecia warstwa pooling
    tf.keras.layers.Flatten(),                                     # Spłaszczenie danych
    tf.keras.layers.Dense(128, activation='relu'),                 # Gęsta warstwa ukryta
    tf.keras.layers.Dense(len(class_names), activation='softmax')  # Warstwa wyjściowa z liczbą klas znaków
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
    epochs=10  # Liczba epok - dostosuj do potrzeb
)

# Zapisywanie modelu
model_save_path = "models/traffic_sign_model.keras"
model.save(model_save_path)
print(f"Model saved at {model_save_path}")
