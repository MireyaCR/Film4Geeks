"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Film, Favourites, Seen, Pending
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/user', methods=['GET'])
def get_all_users(): 
   users = User.query.all()
   result = []  
   for user in users:  
       user_data = {}  
       user_data['id'] = user.id
       user_data['email'] = user.email
       user_data['password'] = user.password
     
       result.append(user_data)  
   return jsonify({'users': result})


@api.route('/user', methods=['POST'])
def create_user():

    body = request.get_json()
    user = User(email=body['email'], password=body['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "user created"}, body), 201

@api.route("/user/<string:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return jsonify("User deleted")


@api.route('/film', methods=['POST'])
def create_film():

    body = request.get_json()
    film = Film(title=body['title'])

    db.session.add(film)
    db.session.commit()

    return jsonify({"message": "Film added"}, body), 201


@api.route('/film', methods=['GET'])
def get_all_films(): 
   films = Film.query.all()
   result = []  
   for film in films:  
       film_data = {}  
       film_data['id'] = film.id
       film_data['title'] = film.title
     
       result.append(film_data)  
   return jsonify({'films': result})