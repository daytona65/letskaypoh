from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, DESCENDING
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db
from models import User, Senior, Visit
from api.date_service import *
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

def get_all_seniors():
    seniors = list(senior_collection.find())
    return Response(json.dumps(seniors, default=str), mimetype="application/json")

def get_senior():
    senior_id = int(request.args.get('id'))
    senior = list(senior_collection.find({"senior_id": senior_id}))
    if senior is None:
        print("Senior not found!")
        return jsonify({"error": "Senior not found"}), 404
    return Response(json.dumps(senior[0], default=json_util.default), mimetype="application/json")

def create_new_senior():
    data = request.json
    name = data.get("name")
    gender = data.get("gender")
    age = data.get("age")
    languages = data.get("languages")
    postal_code = data.get("postal_code")
    address = data.get("address")
    last_visited_date = data.get("last_visited_date")
    lat = data.get("lat")
    lon = data.get("lon")
    
    if not data or not name or not gender or not age or not postal_code or not address or not languages or not last_visited_date or not lat or not lon or not isinstance(languages, list):
        return Response(json.dumps({"error": "Request body error. All fields are required. Languages is a list."}), mimetype='application/json', status=400)
    
    try:
        senior_id = counter_collection.find_one_and_update(
            {"id": "senior_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]
        new_senior = {
                "senior_id": senior_id,
                "name": name,
                "gender": gender,
                "age": age,
                "postal_code": postal_code,
                "address": address,
                "languages": languages,
                "last_visited_date": last_visited_date,
                "lat": lat,
                "lon": lon
        }
        senior_collection.insert_one(new_senior)
    except Exception as e:
        return Response(json.dumps({"message": str(e)}), mimetype="application/json", status=500)

    return jsonify({"message": "Senior created!", "new_senior": str(new_senior)}), 201

def days_last_visited():
    senior_id = int(request.args.get('id'))

    latest_completed_visit = list(visit_collection.find({"senior_id": senior_id, "status": "Completed"}))
    visit_data = json.loads(json.dumps(latest_completed_visit[0], default=json_util.default))

    if not visit_data:
        return jsonify({ "days": "NEVER VISITED" }), 201
    days = days_difference(visit_data['date'])
    print(days)
    return jsonify({ "days": days }), 201

