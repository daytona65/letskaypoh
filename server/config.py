from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import dotenv_values

app = Flask(__name__)
CORS(app)

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]