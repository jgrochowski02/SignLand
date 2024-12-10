import os
import json
from flask import Flask, jsonify, send_from_directory
import boto3
from botocore.exceptions import NoCredentialsError

app = Flask(__name__)

# Ścieżki lokalne dla atlasu
ATLAS_BASE_DIR = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\src\assets\signs"
ATLAS_DATA_FILE = r"C:\Users\48662\OneDrive\Pulpit\PRACA\SignLand\src\data\signs_data.json"


# Konfiguracja S3
S3_BUCKET = "polish-traffic-signs-cnn"
S3_REGION = "eu-north-1"
S3_BASE_URL = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com"
s3_client = boto3.client('s3')


# Endpointy dla atlasu znaków
@app.route('/api/categories', methods=['GET'])
def get_categories():
    if not os.path.exists(ATLAS_BASE_DIR):
        return jsonify({"error": "Base directory not found"}), 404
    categories = [folder for folder in os.listdir(ATLAS_BASE_DIR) if os.path.isdir(os.path.join(ATLAS_BASE_DIR, folder))]
    return jsonify(categories)

@app.route('/api/signs/<category>', methods=['GET'])
def get_signs(category):
    category_path = os.path.join(ATLAS_BASE_DIR, category)
    if not os.path.exists(category_path):
        return jsonify({"error": "Category not found"}), 404

    with open(ATLAS_DATA_FILE, 'r', encoding='utf-8') as file:
        signs_data = json.load(file)

    if category not in signs_data:
        return jsonify({"error": "Category not found in JSON"}), 404

    signs = []
    for file in os.listdir(category_path):
        sign_name = os.path.splitext(file)[0]
        sign_info = next((s for s in signs_data.get(category, []) if s["name"] == sign_name), None)
        if sign_info:
            signs.append({
                "name": sign_info["name"],
                "image": f"http://192.168.0.102:5000/api/image/{category}/{file}",
                "title": sign_info.get("title", "Brak tytułu"),
                "description": sign_info.get("description", "Brak opisu")
            })
    return jsonify(signs)

@app.route('/api/image/<category>/<filename>', methods=['GET'])
def get_image(category, filename):
    category_path = os.path.join(ATLAS_BASE_DIR, category)
    if not os.path.exists(category_path):
        return jsonify({"error": "Category not found"}), 404
    return send_from_directory(category_path, filename)


# Endpointy dla sieci neuronowych z S3
@app.route('/api/neural/train', methods=['GET'])
def get_training_categories():
    try:
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET, Prefix='train-signs/', Delimiter='/')
        if 'CommonPrefixes' not in response:
            return jsonify({"error": "No categories found"}), 404
        categories = [prefix['Prefix'].split('/')[-2] for prefix in response['CommonPrefixes']]
        return jsonify(categories)
    except NoCredentialsError:
        return jsonify({"error": "AWS credentials not found"}), 500

@app.route('/api/neural/train/<category>', methods=['GET'])
def get_training_images(category):
    try:
        # Prefix do wybranego katalogu w S3
        prefix = f"train-signs/{category}/"
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET, Prefix=prefix, Delimiter='/')
        
        if 'CommonPrefixes' not in response:
            return jsonify({"error": f"No subfolders found for category {category}"}), 404

        subfolders = [common_prefix['Prefix'] for common_prefix in response['CommonPrefixes']]
       

        all_images = {}

        for subfolder in subfolders:
            subfolder_name = subfolder.rstrip('/').split('/')[-1]  # Nazwa podkatalogu, np. A1
            
            images_response = s3_client.list_objects_v2(Bucket=S3_BUCKET, Prefix=subfolder)
            
            images = [
                f"{S3_BASE_URL}/{obj['Key']}"
                for obj in images_response.get('Contents', [])
                if obj['Key'].endswith(('.jpg', '.png', '.jpeg'))  
            ]

            if images:
                all_images[subfolder_name] = images

        return jsonify(all_images)

    except NoCredentialsError:
        print("AWS credentials not found.")
        return jsonify({"error": "AWS credentials not found"}), 500
    except Exception as e:
        print(f"Error: {e}") 
        return jsonify({"error": "An error occurred"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
