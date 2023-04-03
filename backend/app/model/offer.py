from app.model import db
from app.model.base import Base
from app.services.guid import GUID


class Offer(Base):
    user_id = db.Column(GUID, db.ForeignKey(
        'user.id'), nullable=False)
    product_id = db.Column(GUID, db.ForeignKey(
        'product.id'), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, product_id, price):
        self.user_id = user_id
        self.product_id = product_id
        self.price = price

    def save(self):
        """
        save in the database
        """

        db.session.add(self)
        db.session.commit()
        return True

    def getAll():
        users = db.session.execute(db.select(Offer)).scalars()
        return users

    def get(**kwargs):
        return Offer.query.filter_by(**kwargs).first()

    @property
    def serialize(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'price': self.price
        }

    def __repr__(self):
        return '<Offer %r>' % self.price
