from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Favourite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='favourite', lazy = True)
    film_id = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'film_id', name='unique_favourite_id'),
    )


    def __repr__(self):
        return f'<Favourite {self.id}>'

    def serialize_fav(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "film_id": self.film_id,
            # do not serialize the password, its a security breach
        }

class Seen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='seen', lazy = True)
    film_id = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'film_id', name='unique_seen_id'),
    )
    
    def __repr__(self):
        return f'<Seen {self.id}>'

    def serialize_seen(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "film_id": self.film_id
            # do not serialize the password, its a security breach
        }


class Pending(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='pending', lazy = True)
    film_id = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'film_id', name='unique_pending_id'),
    )


    def __repr__(self):
        return f'<Pending {self.id}>'

    def serialize_pending(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "film_id": self.film_id,
            # do not serialize the password, its a security breach
        }

