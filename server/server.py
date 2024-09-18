from flask import Response, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db
from models import User, Senior, Visit
from api.user_service import *
from api.senior_service import *
from api.visit_service import *
import json

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

@app.route("/api/users", methods=["GET"])
def users():
    return get_all_users()

@app.route("/api/user", methods=["GET"])
def user():
    user_id = int(request.args.get('id'))
    return get_user(user_id)

@app.route("/api/create_user", methods=["POST"])
def create_user():
    return create_new_user()

@app.route("/api/seniors", methods=["GET"])
def seniors():
    return get_all_seniors()

@app.route("/api/senior", methods=["GET"])
def senior():
    senior_id = int(request.args.get('id'))
    return get_senior(senior_id)

@app.route("/api/create_senior", methods=["POST"])
def create_senior():
    return create_new_senior()

@app.route("/api/visits", methods=["GET"])
def visits():
    return get_all_visits()

@app.route("/api/visit", methods=["GET"])
def visit():
    visit_id = int(request.args.get('id'))
    return get_visit(visit_id)

@app.route("/api/visit_id", methods=["GET"])
def visit_id():
    return latest_visit_id()

@app.route("/api/create_visit", methods=["POST"])
def create_visit():
    return create_new_visit(request.json)

@app.route("/api/update_visit", methods=["PATCH"])
def update_visit():
    return update_visitor(request.json)


@app.route("/api/update_visit_status", methods=["PATCH"])
def update_visit_status():
    return update_status(request.json)
    

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