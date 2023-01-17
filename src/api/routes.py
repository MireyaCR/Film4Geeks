"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favourite, Pending, Seen
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy.orm import validates
import re

api = Blueprint('api', __name__)

#Signup
@api.route('/signup', methods=['POST'])
def signup():
    new_user = {}
    body = request.get_json()
    if body is None:
        return jsonify({"msg":"The body is empty"}), 403
    if validate_email(body["email"]) and validate_password(body["password"]):
        new_user = User(name = body["name"], email = body["email"], password= body["password"])
        print("Esta es mi info desde Back",body)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg":"user registered successfully"}),201


#Token
@api.route("/token", methods=["POST"])
def create_token():
    body= request.get_json()
    if validate_email(body["email"]) and validate_password(body["password"]):
        email = request.json.get("email", None)
        password = request.json.get("password", None)
    # Query your database for username and password
        user = User.query.filter_by(email=email).first()
    if email != email or password !=password:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=email)
    return jsonify( access_token = access_token)




@validates("email")
def validate_email(email):
    if not email:
        raise AssertionError("Email not provided")
    if not re.match("[^@]+@[^@]+.[^@]+", email):
        raise AssertionError("Invalid format email")

    return email


@validates("password")
def validate_password(password):
    if not password:
        raise AssertionError("Password not provided")
    if not re.match('[A-Z]|[A-Z]', password):
        raise AssertionError("Invalid format password")

    return password



@api.route("/token", methods=["GET"])
@jwt_required()
def get_token():
    email = get_jwt_identity()
    dictionary = {
        "message": "Welcome " + email + "!" 
    }

    return jsonify(dictionary)