from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash
from app.services.validation.validationDecorator import *
from app.model.user import User
from app.services.validation.authValidation import LoginSchema, LogoutSchema, MeSchema

auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.post("/login")
@validate_json
@validate_schema(LoginSchema())
def login():
    data = request.json
    user = User.get(email=data["email"])

    if user and check_password_hash(user.password, data["password"]):
        session[str(user.id)] = user
        return jsonify({"firstname":str(user.firstname),"lastname":str(user.lastname),"message": "Login success", "access_token": str(user.id)}), 200

    return jsonify({"message": "wrong email or password"}), 400


@auth.post("/logout")
@validate_json
@validate_schema(LogoutSchema())
def logout():
    data = request.json
    session.pop(data["access_token"])
    return jsonify({"message": "done sesssion"}), 200


@auth.post("/me")
@validate_schema(MeSchema())
@validate_json
def val():
    data = request.json
    user = session[data["access_token"]]
    return jsonify({'messages': 'current user', 'data': user.serialize}), 200
