from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from app.model.user import User
from app.services.validation.validationDecorator import *
from app.services.validation.userValidation import CreateUserSchema

user = Blueprint('user', __name__, url_prefix='/user')


@user.get("")
def getUser():
    users = User.getAll()
    return jsonify({'messages': 'listed users', 'data': [i.serialize for i in users]}), 200


@user.post("")
@validate_json
@validate_schema(CreateUserSchema())
def createUser():
    data = request.json
    user = User.get(email = data["email"])
    if user:
        return jsonify({"message": "User Exist"}), 400
    
    user = User(firstname=data["firstname"], lastname=data["lastname"],
                email=data["email"], password=generate_password_hash(data["password"], method='sha256'))
    user.save()
    return jsonify({"message": "created user"}), 201
