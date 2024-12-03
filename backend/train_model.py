import os
import tensorflow as tf

# Ścieżki do katalogów
train_dir = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\data\train"
val_dir = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\data\validation"

# Funkcja do uzyskiwania nazw klas na podstawie struktury katalogów
def get_class_names(dataset_path):
    class_names = sorted([dir_name for dir_name in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, dir_name))])
    return class_names

# Ustawianie nazw klas na podstawie danych treningowych
class_names = get_class_names(train_dir)
num_classes = len(class_names)
print("Classes found:", class_names)

# Tworzenie datasetów z katalogów
train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=(150, 150),  # Rozmiar obrazu dostosowany do sieci CNN
    batch_size=32
)

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    val_dir,
    image_size=(150, 150),
    batch_size=32
)

# Optymalizacja działania dzięki buforowaniu danych
AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)

# Budowanie modelu CNN
model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1./255, input_shape=(150, 150, 3)),  # Normalizacja danych
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),         # Warstwa konwolucyjna
    tf.keras.layers.MaxPooling2D((2, 2)),                          # Warstwa pooling
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),         # Kolejna warstwa konwolucyjna
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),                                     # Spłaszczenie danych wejściowych
    tf.keras.layers.Dense(128, activation='relu'),                 # Gęsta warstwa ukryta
    tf.keras.layers.Dense(num_classes, activation='softmax')       # Warstwa wyjściowa
])

# Kompilacja modelu
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
    epochs=10  # Możesz zwiększyć liczbę epok
)

# Zapisywanie modelu
model_save_path = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\backend\models\traffic_sign_model.h5"
model.save(model_save_path)
print(f"Model saved at {model_save_path}")
