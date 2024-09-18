from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import dotenv_values
import os

app = Flask(__name__)
CORS(app)

config = dotenv_values(".env")
ATLAS_URI = os.getenv('ATLAS_URI')
DB_NAME = os.getenv('DB_NAME')
client = MongoClient(ATLAS_URI)
db = client[DB_NAME]