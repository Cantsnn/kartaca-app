from app.model import db
from app.model.base import Base
from sqlalchemy import desc
from app.model.offer import Offer


class Product(Base):
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    offers = db.relationship('Offer', backref='product', lazy='dynamic')

    def __init__(self, name, image_url):
        self.name = name
        self.image_url = image_url

    def save(self):
        """
        save in the database
        """

        db.session.add(self)
        db.session.commit()
        return True

    def getAll():
        product = db.session.execute(db.select(Product)).scalars()
        return product
    

    def get(**kwargs):
        return Product.query.filter_by(**kwargs).first()

    def maxOfferProduct(self):
        return self.offers.order_by(desc(Offer.price)).first()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url
        }
    
    @property
    def getallbymaxprice(self):
        if hasattr(self.maxOfferProduct(), 'price'):
            max_offer = self.maxOfferProduct().price
        else:
            max_offer = 100
        return {
            'id': str(self.id),
            'name': self.name,
            'image_url': self.image_url,
            'max_offer': max_offer
        }
 

    def __repr__(self):
        return '<Product %r>' % self.name
