from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db
from models import User, Senior, Visit
from api.user_service import *
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

# 1
@app.route("/users", methods=["GET"])
def users():
    return get_all_users()

# 2
@app.route("/user", methods=["GET"])
def user():
    user_id = int(request.args.get('id'))
    return get_user(user_id)

# 3
@app.route("/create_user", methods=["POST"])
def create_user():
    return create_new_user()

# 4
@app.route("/seniors", methods=["GET"])
def get_all_seniors():
    seniors = list(senior_collection.find())
    return Response(json.dumps(seniors, default=str), mimetype="application/json")

# 5
@app.route("/senior", methods=["GET"])
def get_senior():
    senior_id = int(request.args.get('id'))
    senior = list(senior_collection.find({"senior_id": senior_id}))
    if senior is None:
        print("Senior not found!")
        return jsonify({"error": "Senior not found"}), 404
    return json.dumps(senior[0], default=json_util.default)

# 6
@app.route("/visits", methods=["GET"])
def get_all_visits():
    visits = list(visit_collection.find())
    return Response(json.dumps(visits, default=str), mimetype="application/json")

# 7
@app.route("/visit", methods=["GET"])
def get_visit(visit_id):
    visit_id = int(request.args.get('id'))
    visit = list(user_collection.find({"visit_id": visit_id}))
    if visit is None:
        print("Visit not found!")
        return jsonify({"error": "Visit not found"}), 404
    return json.dumps(visit[0], default=json_util.default)

# 8
@app.route("/create_visit", methods=["POST"])
def create_visit():
    visit_id = counter_collection.find_one_and_update(
        {"id": "visit_count"},
        {"$inc": {"count": 1}},
        return_document=True,
        upsert=True
    )["count"]
    data = request.json
    senior_id = data.get("senior_id")
    visitor_ids = data.get("visitor_ids")
    datetime = data.get("datetime")
    
    if not data or not senior_id or not visitor_ids or not datetime or not isinstance(visitor_ids, list):
        return jsonify({"error": "Request body error. senior_id, visitor_ids, datetime are required fields."}), 400
    
    try:
        new_visit = {
                "visit_id": visit_id,
                "senior_id": senior_id,
                "visitor_ids": visitor_id,
                "datetime": datetime  
        }
        visit_collection.insert_one(new_visit)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "User created!", "new_user": str(new_user)}), 201

# 9
@app.route("/update_visitor", methods=["PATCH"])
def update_visitor():
    data = request.json
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

# 10
@app.route("/update_visit_status", methods=["PATCH"])
def update_visit_status():
    data = request.json
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

# 11 Send SMS










# Templates ================================================================
# @app.route("/update_user/<int:user_id>", methods=["PATCH"])
# def update_user(user_id):
#     user = user.query.get(user_id)

#     if not user:
#         return jsonify({"message": "User not found"}), 404

#     data = request.json
#     user.first_name = data.get("firstName", user.first_name)
#     user.last_name = data.get("lastName", user.last_name)
#     user.email = data.get("email", user.email)

#     db.session.commit()

#     return jsonify({"message": "Usr updated."}), 200


# @app.route("/delete_user/<int:user_id>", methods=["DELETE"])
# def delete_user(user_id):
#     user = user.query.get(user_id)

#     if not user:
#         return jsonify({"message": "User not found"}), 404

#     db.session.delete(user)
#     db.session.commit()

#     return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)