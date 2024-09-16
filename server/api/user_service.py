from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db
from models import User, Senior, Visit
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

def get_all_users():
    users = list(user_collection.find())
    return Response(json.dumps(users, default=str), mimetype="application/json")

def get_user(user_id):
    user = list(user_collection.find({"user_id": user_id}))
    if user is None:
        print("User not found!")
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")

def create_new_user():
    user_id = counter_collection.find_one_and_update(
        {"id": "user_count"},
        {"$inc": {"count": 1}},
        return_document=True,
        upsert=True
    )["count"]
    data = request.json
    nric = data.get("nric")
    name = data.get("name")
    gender = data.get("gender")
    age = data.get("age")
    postal_code = data.get("postal_code")
    address = data.get("address")
    languages = data.get("languages")
    profile_img = data.get("profile_img")
    email = data.get("email")
    password = data.get("password")
    
    if not data or not nric or not name or not gender or not age or not postal_code or not address or not languages or not profile_img or not email or not password or not isinstance(languages, list):
        return Response({"error": "Request body error. All fields are required. Languages is a list."}, mimetype='application/json', status=400)
    
    try:
        new_user = {
                "user_id": user_id,
                "nric": nric,
                "name": name,
                "gender": gender,
                "age": age,
                "postal_code": postal_code,
                "address": address,
                "languages": languages,
                "profile_img": profile_img,
                "email": email,
                "password": password
        }
        user_collection.insert_one(new_user)
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!", "new_user": str(new_user)}), 201