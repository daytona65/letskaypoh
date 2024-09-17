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


def get_all_visits():
    visits = list(visit_collection.find())
    return Response(json.dumps(visits, default=str), mimetype="application/json")

def get_visit(visit_id):
    visit = list(user_collection.find({"visit_id": visit_id}))
    if visit is None:
        print("Visit not found!")
        return jsonify({"error": "Visit not found"}), 404
    return Response(json.dumps(visit[0], default=json_util.default), mimetype="application/json")

def generate_visit_id():
    return Response(json.dumps(counter_collection.find({"id": "visit_count"})["count"] + 1), mimetype="application/json")

def create_new_visit(data):
    senior_id = data.get("senior_id")
    visitor_ids = data.get("visitor_ids")
    datetime = data.get("datetime")
    
    if not data or not senior_id or not visitor_ids or not datetime or not isinstance(visitor_ids, list):
        return jsonify({"error": "Request body error. senior_id, visitor_ids, datetime are required fields."}), 400

    try:
        visit_id = counter_collection.find_one_and_update(
            {"id": "visit_count"},
            {"$inc": {"count": 1}},
            return_document=True,
            upsert=True
        )["count"]

        new_visit = {
                "visit_id": visit_id,
                "senior_id": senior_id,
                "visitor_ids": visitor_ids,
                "datetime": datetime,
                "status": "Upcoming"
        }

        visit_collection.insert_one(new_visit)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "Visit created!", "new_visit": str(new_visit)}), 201

def update_visitor(data):
    visit_id = data.get('visit_id')
    visitor_id = data.get('visitor_id')
    action = data.get('action')
    if not visit_id or not visitor_id or not action or (action != "add" and action != "delete"):
        return jsonify({"error": "visit id, visitor_id and action fields are required. For actions, only 'add' and 'delete' are allowed."}), 400
    visit_id = int(visit_id)
    visitor_id = int(visitor_id)
    action = str(action)
    try:
        if (action == "add"):
            result = visit_collection.update_one(
                {"visit_id": visit_id},       
                {"$addToSet": {"visitor_ids": visitor_id}}  
            )
        elif (action == "delete"):
            result = user_collection.update_one(
                {"visit_id": visit_id},
                {"$pull": {"visitor_ids": visitor_id}}
            )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": f"Visitor {visitor_id} {action} on visit {visit_id}"}), 201

def update_status(data):
    visit_id = data.get('visit_id')
    status = data.get('status')
    if not visit_id or not status or (status != "Completed" or status != "Upcoming" or status != "Cancelled"):
        return jsonify({"error": "visit_id and status fields are required. For status, only 'Completed', 'Upcoming' and 'Cancelled' are allowed."}), 400
    visit_id = int(visit_id)
    statis = str(status)
    try:
        result = user_collection.update_one(
            {"visit_id": visit_id},
            {"$set": {"status": status}}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": f"Visit {visit_id} status: {status}"}), 201