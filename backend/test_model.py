import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
#from tensorflow.keras.utils import load_img, img_to_array

# Ścieżka do zapisanego modelu
model_path = "models/traffic_sign_model.keras"


model = keras.models.load_model(model_path)
print("Model loaded successfully.")

# Ścieżka do danych testowych
test_dir = "data/test-signs"


test_dataset = tf.keras.utils.image_dataset_from_directory(
    test_dir,
    image_size=(150, 150),
    batch_size=32,
    shuffle=False 
)


class_names = test_dataset.class_names
print(f"Classes in test dataset: {class_names}")


print("Evaluating model...")
loss, accuracy = model.evaluate(test_dataset)
print(f"Test Accuracy: {accuracy * 100:.2f}%")

print("Generating predictions...")
predictions = model.predict(test_dataset)
predicted_classes = np.argmax(predictions, axis=1)  # Klasy przewidywane
true_classes = np.concatenate([y for x, y in test_dataset], axis=0)  # Rzeczywiste klasy

# Raport dokładności dla każdej klasy

print("Classification Report:")
print(classification_report(true_classes, predicted_classes, target_names=class_names))

# Macierz konfuzji
#print("Generating confusion matrix...")
#conf_matrix = confusion_matrix(true_classes, predicted_classes)

# Wyświetlenie macierzy konfuzji
#plt.figure(figsize=(10, 8))  
#plt.imshow(conf_matrix, interpolation="nearest", cmap=plt.cm.Blues)
#plt.title("Confusion Matrix")
#plt.colorbar()
#tick_marks = np.arange(len(class_names))
#plt.xticks(tick_marks, class_names, rotation=45)
#plt.yticks(tick_marks, class_names)
#plt.ylabel("True Label")
#plt.tight_layout()
#plt.show()

# Testowanie na pojedynczych obrazach (opcjonalne)
#def test_single_image(image_path):
 

 #   image = load_img(image_path, target_size=(150, 150))
  #  image_array = img_to_array(image) / 255.0  # Normalizacja
   # image_array = np.expand_dims(image_array, axis=0)  # Dodanie wymiaru batch

#    prediction = model.predict(image_array)
 #   predicted_class = np.argmax(prediction, axis=1)[0]
  #  print(f"Predicted class: {class_names[predicted_class]}")
   # plt.imshow(image)
   # plt.title(f"Predicted: {class_names[predicted_class]}")
   # plt.show()

# Przykład testowania na jednym obrazie
# image_path = r"ścieżka_do_testowego_obrazu.jpg"
# test_single_image(image_path)
