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

def get_user():
    user_id = int(request.args.get('id'))
    user = list(user_collection.find({"user_id": user_id}))
    if user is None:
        print("User not found!")
        return jsonify({"error": "User not found"}), 404
    return Response(json.dumps(user[0], default=json_util.default), mimetype="application/json")

def create_new_user():
    data = request.json
        
    if not data:
        return Response(json.dumps({"error": "Request body error in create new user"}), mimetype='application/json', status=400)
    
    try:
        user_id = counter_collection.find_one_and_update(
            {"id": "user_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]
        new_user = {**data, "user_id": user_id}
        user_collection.insert_one(new_user)
    except Exception as e:
        return Response(json.dumps({"message": str(e)}), mimetype="application/json", status=500)

    return jsonify({"message": "User created!", "new_user": str(new_user)}), 201