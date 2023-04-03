from flask import Blueprint, jsonify, request, session
from app.model.product import Product
from app.services.validation.validationDecorator import *
from app.services.validation.productValidation import CreateProductSchema
from app.services.login_required_decorator import login_required

product = Blueprint('product', __name__, url_prefix='/product')


@product.get("")
#@login_required
def getAllProduct():
    products = Product.getAll()
    return jsonify({'messages': 'listed product', 'data': [i.serialize for i in products]}), 200


@product.post("")
#@login_required
@validate_json
@validate_schema(CreateProductSchema())
#@login_required
def createProduct():
    data = request.json
    user = Product(name=data["name"], image_url=data["image_url"])
    user.save()
    return jsonify({"message": "created product"}), 201
