from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import dotenv_values, load_dotenv
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
jwt = JWTManager(app)
load_dotenv()

config = dotenv_values(".env")
ATLAS_URI = os.getenv('ATLAS_URI')
DB_NAME = os.getenv('DB_NAME')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
client = MongoClient(ATLAS_URI)
db = client[DB_NAME]