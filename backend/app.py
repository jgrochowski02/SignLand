import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

BASE_DIR = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\src\assets\signs"

# Endpoint do pobierania kategorii (folderów)
@app.route('/api/categories', methods=['GET'])
def get_categories():
    print("BASE_DIR:", BASE_DIR)
    if not os.path.exists(BASE_DIR):
        print("Directory does not exist:", BASE_DIR)
        return jsonify({"error": "Base directory not found"}), 404
    categories = os.listdir(BASE_DIR)
     
    return jsonify(categories)


# Endpoint do pobierania plików w wybranej kategorii
@app.route('/api/signs/<category>', methods=['GET'])
def get_signs(category):
    category_path = os.path.join(BASE_DIR, category)
    if not os.path.exists(category_path):
        return jsonify({"error": "Category not found"}), 404
    
    signs = [{
                "name": os.path.splitext(file)[0],
                "url": f"/api/image/{category}/{file}"
             }
    for file in os.listdir(category_path)]
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
