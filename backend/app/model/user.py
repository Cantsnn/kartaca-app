from app.model import db
from app.model.base import Base


class User(Base):
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    offers = db.relationship('Offer', backref='user', lazy=True)

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password

    def save(self):
        """
        save in the database
        """

        db.session.add(self)
        db.session.commit()
        return True

    def getAll():
        users = db.session.execute(db.select(User)).scalars()
        return users

    def get(**kwargs):
        return User.query.filter_by(**kwargs).first()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email
        }

    def __repr__(self):
        return '<User %r>' % self.firstname
