from flask import Blueprint, jsonify
from app.controller.user_controller import user
from app.controller.auth_controller import auth
from app.controller.product_controller import product


main = Blueprint('main', __name__)


@main.get("/")
def index():
    return jsonify({'message': 'hello'}), 200


api = Blueprint("api", __name__, url_prefix="/api/v1")
api.register_blueprint(user)
api.register_blueprint(auth)
api.register_blueprint(product)

main.register_blueprint(api)
