import os
import json
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

BASE_DIR = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\src\assets\signs"
DATA_FILE = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\src\data\signs_data.json"

# Endpoint do pobierania kategorii (folderów)
@app.route('/api/categories', methods=['GET'])
def get_categories():
    if not os.path.exists(BASE_DIR):
        return jsonify({"error": "Base directory not found"}), 404
    categories = [folder for folder in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, folder))]
    return jsonify(categories)

# Endpoint do pobierania plików w wybranej kategorii
@app.route('/api/signs/<category>', methods=['GET'])
def get_signs(category):
    category_path = os.path.join(BASE_DIR, category)
    print(f"Decoded category: {category}")  # Log kategorii

    if not os.path.exists(category_path):
        return jsonify({"error": "Category not found"}), 404

    # Wczytaj dane z JSON
    with open(DATA_FILE, 'r', encoding='utf-8') as file:
        signs_data = json.load(file)

    if category not in signs_data:
        return jsonify({"error": "Category not found in JSON"}), 404

    # Pobierz dane znaków
    signs = []
    for file in os.listdir(category_path):
        sign_name = os.path.splitext(file)[0]
        sign_info = next((s for s in signs_data.get(category, []) if s["name"] == sign_name), None)
        if sign_info:
            signs.append({
                "name": sign_info["name"],
                "image": f"http://192.168.0.104:5000/api/image/{category}/{file}",
                "title": sign_info.get("title", "Brak tytułu"),
                "description": sign_info.get("description", "Brak opisu")
            })

    return jsonify(signs)


# Endpoint do serwowania obrazów
@app.route('/api/image/<category>/<filename>', methods=['GET'])
def get_image(category, filename):
    category_path = os.path.join(BASE_DIR, category)
    if not os.path.exists(category_path):
        return jsonify({"error": "Category not found"}), 404
    return send_from_directory(category_path, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
