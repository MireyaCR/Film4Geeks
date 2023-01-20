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
import requests
import re
import os
TMDB_API = os.getenv("TMDB_API")

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

@api.route('/user/seen', methods=['POST', 'GET'])
@jwt_required()
def add_seen_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        print(user.id)
        seen = Seen(film_id=body['film_id'], user_id=user.id)
    
        db.session.add(seen)
        db.session.commit()

        return jsonify({"message": "success"}), 200


    if request.method == 'GET':
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        seen = Seen.query.filter_by(user_id = user.id)

        response_body = []
        for film in seen:
            response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
            data = response.json()
            seen_data = film.serialize_seen()
            seen_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
            response_body.append(seen_data)

        return jsonify(response_body),200


@api.route('/user/favourite', methods=['POST', 'GET'])
@jwt_required()
def add_fav_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        print(user.id)
        favourite = Favourite(film_id=body['film_id'], user_id=user.id)
    
        db.session.add(favourite)
        db.session.commit()
        return jsonify({"message": "success"}), 200

    if request.method == 'GET':
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        favourite = Favourite.query.filter_by(user_id = user.id)

        response_body = []
        for film in favourite:
            response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
            data = response.json()
            favorite_data = film.serialize_fav()
            favorite_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
            response_body.append(favorite_data)

        return jsonify(response_body),200


    


@api.route('/user/pending', methods=['POST', 'GET'])
@jwt_required()
def add_pending_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        print(user.id)
        pending = Pending(film_id=body['film_id'], user_id=user.id)
   
        db.session.add(pending)
        db.session.commit()

        return jsonify({"message": "success"}), 200


    if request.method == 'GET':
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        pending = Pending.query.filter_by(user_id = user.id)

        response_body = []
        for film in pending:
            response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
            data = response.json()
            pending_data = film.serialize_pending()
            pending_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
            response_body.append(pending_data)

        return jsonify(response_body),200



# Metodo de prueba para la llamada, borrar al finalizar 
@api.route('/prueba', methods=['GET'])
def handle_hello():
    prueba = Favourite.query.all()
    prueba = list(map(lambda x: x.serialize_fav(), prueba))
    response_body = prueba
    return jsonify(response_body),200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_info():
        # body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        user= list(map(lambda x: x.serialize(), user))
        response_body= user.id

        return jsonify(response_body), 200