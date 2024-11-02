from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import dotenv_values, load_dotenv
import os
from datetime import timedelta

app = Flask(__name__)
load_dotenv()

app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

bcrypt = Bcrypt(app)
CORS(app)
jwt = JWTManager(app)


client = MongoClient(os.getenv('ATLAS_URI'))
db = client[os.getenv('DB_NAME')]