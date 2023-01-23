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



@api.route('/user/seen', methods=['POST', 'GET','DELETE'])
@jwt_required()
def add_seen_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()        
        seen = Seen(film_id=body['film_id'], user_id=user.id)    
        db.session.add(seen)
        db.session.commit()
        return jsonify({"message": "success","status":200}), 200

    if request.method == 'GET':
        film_id=request.args.get("film_id",default="",type=int)
        email = get_jwt_identity()        
        user = User.query.filter_by(email=email).first()
        response_body = []
        if film_id=="" :
            seen= Seen.query.filter_by(user_id = user.id)
            for film in seen:
                response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
                data = response.json()
                seen_data = film.serialize_seen()
                seen_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
                seen_data["genres"] = data.get("genres")
                response_body.append(seen_data)    
            return jsonify(response_body),200
        else:
            seen= Seen.query.filter_by(film_id=film_id, user_id=user.id).first()
            if seen:
                return jsonify({"message":"Seen found", "status":200}),200
            else :
                return jsonify({"message":"Seen not found", "status": 404}),404

    if request.method == 'DELETE':        
        email = get_jwt_identity()
        film_id=request.args.get("film_id",default="",type=int)
        user = User.query.filter_by(email=email).first()
        seen = Seen.query.filter_by(film_id=film_id, user_id=user.id).first()
        if seen:
            db.session.delete(seen)
            db.session.commit()
            return jsonify({"message":"Película borrada de vistos", "status":200}), 200
        else:
            return jsonify({"message": "Film not found", "status":404}), 404   


@api.route('/user/favourite', methods=['POST', 'GET','DELETE'])
@jwt_required()
def add_fav_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()       
        favourite = Favourite(film_id=body['film_id'], user_id=user.id)    
        db.session.add(favourite)
        db.session.commit()
        return jsonify({"message": "success","status":200}), 200

    if request.method == 'GET':        
        film_id=request.args.get("film_id",default="",type=int)
        email = get_jwt_identity()       
        user = User.query.filter_by(email=email).first()
        response_body = []        
        if film_id== "" :
            favourite = Favourite.query.filter_by(user_id = user.id)
            for film in favourite:
                response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
                data = response.json()
                favorite_data = film.serialize_fav()
                favorite_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
                response_body.append(favorite_data)            
            return jsonify(response_body),200    
        else:
            favourite = Favourite.query.filter_by(film_id = film_id, user_id = user.id).first()
            if favourite:
                return jsonify({"message":"Favourite found", "status": 200}),200
            else:
                return jsonify({"message":"Favourite not found", "status": 404}),404

    if request.method == 'DELETE':        
        email = get_jwt_identity()
        film_id=request.args.get("film_id",default="",type=int)
        user = User.query.filter_by(email=email).first()
        favourite = Favourite.query.filter_by(film_id = film_id, user_id = user.id).first()
        if favourite:
            db.session.delete(favourite)
            db.session.commit()
            return jsonify({"message":"Película borrada de favoritos", "status":200}), 200
        else:
            return jsonify({"message": "Film not found", "status":404}), 404   


    
@api.route('/user/pending', methods=['POST', 'GET','DELETE'])
@jwt_required()
def add_pending_to_db():
    if request.method == 'POST':
        body = request.json
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        pending = Pending(film_id=body['film_id'], user_id=user.id)   
        db.session.add(pending)
        db.session.commit()
        return jsonify({"message": "success","status":200}), 200

    if request.method == 'GET':
        film_id=request.args.get("film_id",default="",type=int)
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        response_body = []        
        if film_id=="" :
            pending = Pending.query.filter_by(user_id = user.id)
            for film in pending:
                response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
                data = response.json()
                pending_data = film.serialize_pending()
                pending_data['image_url'] = f'https://image.tmdb.org/t/p/w500/{data.get("poster_path")}'
                response_body.append(pending_data)
            return jsonify(response_body),200
        else:
            pending=Pending.query.filter_by(film_id=film_id, user_id=user.id).first()
            if pending:
                return jsonify({"message":"Pending found", "status": 200}),200
            else:
                return jsonify({"message":"Pending not found", "status": 404}),404

    if request.method == 'DELETE':        
        email = get_jwt_identity()
        film_id=request.args.get("film_id",default="",type=int)
        user = User.query.filter_by(email=email).first()
        pending = Pending.query.filter_by(film_id=film_id, user_id=user.id).first()
        if pending:
            db.session.delete(pending)
            db.session.commit()
            return jsonify({"message":"Película borrada de pendientes", "status":200}), 200
        else:
            return jsonify({"message": "Film not found", "status":404}), 404   


@api.route('/user', methods=['GET'])
@jwt_required()
def get_info():  
    print("prueba")
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    seen = Seen.query.filter_by(user_id = user.id)
    name = user.name
    email = user.email
    response_body = {}
    response_body["name"]= name
    response_body["email"] = email
    genres = []
    for film in seen:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{film.film_id}?api_key={TMDB_API}')
        data = response.json()
        seen_data ={} 
        genres.extend([element["name"] for element in data.get("genres")])
    genres_list = list(set(genres))
    genres_data = []
    for i in genres_list:
        genres_data.append(genres.count(i))
       
    response_body["genres"]= {
        "genres": genres_list,
        "genres_data": genres_data
    }

    print(response_body)

    return jsonify(response_body), 200



# Validaciones
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