from app.model import db
from app.controller import *
from app.socket.socketio import socket_io
import config

import os
from flask import (
    Flask,
    jsonify
)
from flask_cors import CORS
from flask_session import Session
#from flask_socketio import SocketIO, emit

# Application initialization
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config.from_object(config.DevelopmentConfig)


@app.errorhandler(404)
def page_not_found(error):
    return jsonify({'message': 'not found'}), 404


# Database Initialization
db.init_app(app)
if not os.path.exists(config.SQLLITE_DB_PATH):
    with app.app_context():
        db.create_all()

# Session
server_session = Session(app)

# Register Blueprints
app.register_blueprint(main)

# Socket IO
socket_io.init_app(app, cors_allowed_origins="*")
# socket_io = SocketIO(app, cors_allowed_origins="*")
# @socket_io.on('connect')
# def test_connect():
#     print("connect")

# @socket_io.on('my-event')
# def handle_json(json):
#     print('received json: ' + str(json))
#     socket_io.emit('offer', {'data':'enes'})
