from flask import Flask, Response, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, JWTManager, set_access_cookies, unset_jwt_cookies
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient
from dotenv import dotenv_values
from bson import json_util, ObjectId
from config import app, db, bcrypt
from api.user_service import *
from api.senior_service import *
from api.visit_service import *
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
import json
import pytz

config = dotenv_values(".env")

user_collection = db['users']
senior_collection = db['seniors']
visit_collection = db['visits']
counter_collection = db['counters']

@app.route("/register", methods=["POST"])
def register():
    return register_user()

@app.route('/login', methods=['POST'])
def login():
    return login_user()

@app.route('/email', methods=['GET'])
def email():
    return check_email()

@app.route('/mobile', methods=['GET'])
def mobile():
    return check_mobile()

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out successfully'})

@app.route("/users", methods=["GET"])
def users():
    return get_all_users()

@app.route("/user", methods=["GET"])
@jwt_required()
def user():
    return get_user()

@app.route("/seniors", methods=["GET"])
@jwt_required()
def seniors():
    return get_all_seniors()

@app.route("/senior", methods=["GET"])
@jwt_required()
def senior():
    return get_senior()

@app.route("/create_senior", methods=["POST"])
def create_senior():
    return create_new_senior()

@app.route("/update_senior", methods=["PATCH"])
@jwt_required()
def update_senior_function():
    return update_senior()

@app.route("/visits", methods=["GET"])
@jwt_required()
def visits():
    return get_all_visits()

@app.route("/visit", methods=["GET"])
@jwt_required()
def visit():
    return get_visit()

@app.route("/user_visits", methods=["GET"])
@jwt_required()
def user_visits():
    return get_user_visits()

@app.route("/visit_id", methods=["GET"])
@jwt_required()
def visit_id():
    return latest_visit_id()

@app.route("/create_visit", methods=["POST"])
@jwt_required()
def create_visit():
    return create_new_visit()

@app.route("/update_visit", methods=["PATCH"])
@jwt_required()
def update_visit_function():
    return update_visit()
    
@app.route("/days", methods=["GET"])
def days():
    return days_last_visited()

@app.route("/verify", methods=["GET"])
def verify():
    message = Mail(
        from_email='letskaypoh@gmail.com',
        to_emails='josephine.hemingway@gmail.com',
        subject='via api Sending with Twilio SendGrid is Fun',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')
    
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return jsonify({ "success": response.body }), 200

    except Exception as e:
        print(e)
        return jsonify("error"), 401

     
@app.route("/token", methods=["GET"])
@jwt_required()
def token():
    return jwt_valid()

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(pytz.timezone("Asia/Singapore"))
        target_timestamp = datetime.timestamp(now + timedelta(minutes=5))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response
    
@jwt.expired_token_loader
def expired_token_callback(what, expired_token):
    print(what)
    print(expired_token)
    token_type = expired_token['type']
    return jsonify({
        'status': 401,
        'sub_status': 42,
        'msg': 'The {} token has expired'.format(token_type)
    }), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)