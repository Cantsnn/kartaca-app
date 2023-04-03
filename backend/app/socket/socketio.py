from flask_socketio import SocketIO, emit
from app.model.offer import Offer
from app.model.user import User
from app.model.product import Product

socket_io = SocketIO()


@socket_io.on('connect')
def test_connect():
    print("connect")
    products = Product.getAll()
    data = [i.getallbymaxprice for i in products]
    print('received json: ', data)
    emit('offer_announce', data, broadcast=True)


@socket_io.on('offer')
def handle_offer(json):
    result = ''
    user = User.get(id=json['user_id'])
    if not user:
        return
    print("****************")
    print(json["user_id"])
    print("****************")
    product = Product.get(id=json['product_id'])
    if not product:
        return
    
    max_price_offer = product.maxOfferProduct()    
    if max_price_offer and json['price'] <= max_price_offer.price:
        return
    
    offer = Offer(json['user_id'], json['product_id'], json['price'])
    offer.save()
   
    products = Product.getAll()
    data = [i.getallbymaxprice for i in products]
    print('received json: ', data)
    emit('offer_announce', data, broadcast=True)
