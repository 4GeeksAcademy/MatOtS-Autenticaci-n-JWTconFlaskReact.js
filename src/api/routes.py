"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    users = db.session.execute(select(User)).scalars().all()

    if email == None or password == None:
        return jsonify({"msg": "Bad email or password"}), 401
    for user in users:
        if email in user.email:
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200

    print(access_token)

    return jsonify({"msg": "Bad email or password"}), 401


@api.route('/signup', methods=['POST'])
def signUp_user():
    users = db.session.execute(select(User)).scalars().all()
    body = request.json
    for user in users:
        if user.email == body["email"]:
            return {"msg": "email already in use"}, 409
    user = User(**body, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "msg": "User created succesfully",
        "user": user.email
    }), 201


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    userDb = db.session.execute(select(User).where(User.email == current_user_email)).scalars().all()
    user = db.session.get(User, userDb[0].id)

    return jsonify({
        "msg": "Token valid",
        "user": user.serialize()
    }), 200
