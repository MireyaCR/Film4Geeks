from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    filmId = db.Column(db.Integer, db.ForeignKey("film.id"))
    fav_films = db.relationship(Film)
    user = db.relationship(User)

    def __repr__(self):
        return f'<Favourites {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "userId":self.userId,
            "filmId":self.filmId
            # do not serialize the password, its a security breach
        }

class Seen(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    filmId = db.Column(db.Integer, db.ForeignKey("film.id"))
    seen_films = db.relationship(Film)
    user = db.relationship(User)

    def __repr__(self):
        return f'<Seen {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "userId":self.userId,
            "filmId":self.filmId
            # do not serialize the password, its a security breach
        } 

class Pending(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    filmId = db.Column(db.Integer, db.ForeignKey("film.id"))
    pending_films = db.relationship(Film)
    user = db.relationship(User)

    def __repr__(self):
        return f'<Pending {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "userId":self.userId,
            "filmId":self.filmId
            # do not serialize the password, its a security breach
        } 
    


class Film(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    

    def __repr__(self):
        return f'<Film {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            # do not serialize the password, its a security breach
        }

