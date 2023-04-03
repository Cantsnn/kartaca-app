from functools import wraps
from marshmallow import ValidationError
from flask import (
    jsonify,
    request,
)


def validate_json(f):
    @wraps(f)
    def wrapper(*args, **kw):
        try:
            request.json
        except:
            msg = "payload must be a valid json"
            return jsonify({"error": msg}), 400
        return f(*args, **kw)
    return wrapper


def validate_schema(schema):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kw):
            try:
                schema.validate(request.json)
            except ValidationError as e:
                return jsonify({"error": e.messages}), 400
            return f(*args, **kw)
        return wrapper
    return decorator
