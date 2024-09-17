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

def get_all_seniors():
    seniors = list(senior_collection.find())
    return Response(json.dumps(seniors, default=str), mimetype="application/json")

def get_senior(senior_id):
    senior = list(senior_collection.find({"senior_id": senior_id}))
    if senior is None:
        print("Senior not found!")
        return jsonify({"error": "Senior not found"}), 404
    return Response(json.dumps(senior[0], default=json_util.default), mimetype="application/json")


