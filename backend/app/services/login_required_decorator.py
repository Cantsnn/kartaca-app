from flask import session, request, jsonify
from functools import wraps

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kw):
        try:
            print(request.headers)
            token = request.headers.get("access_token")
 
            if not token:
                raise()
            user = session[token]
 
            
            if not user:
                raise()
        except:
            msg = "unauthorized"
            return jsonify({"error": msg}), 401
        return f(*args, **kw)
    return wrapper

