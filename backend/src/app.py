import os
 
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

from bson import ObjectId

app = Flask(__name__)
# Settings
CORS(app)

# ==== PyMongo =====
app.config['MONGO_URI'] = \
    f"mongodb://" \
    f"{os.environ['MONGODB_USERNAME']}:" \
    f"{os.environ['MONGODB_PASSWORD']}@" \
    f"{os.environ['MONGODB_HOST']}:27017/fullstackdemo"

mongo = PyMongo(app)
db = mongo.db.spending_tracker


@app.route('/api', methods=['POST'])
def create_spending():
    """ Create Spending by ID """

    db.insert_one({
      'date': request.json['date'],
      'category': request.json['category'],
      'description': request.json['description'],
      'amount': request.json['amount']
    })

    return jsonify(message="Spending added")


@app.route("/api", methods=['GET'])
def get_spendings_list():
    """ Read collection from DB """

    spendings = []
    for spending in db.find():
        spendings.append({
            '_id': str(ObjectId(spending['_id'])),
            'date': spending['date'],
            'category': spending['category'],
            'description': spending['description'],
            'amount': spending['amount']
        })

    return jsonify(spendings)


@app.route('/api/<id>', methods=['GET'])
def get_spending(id):
    """ Read Spending by ID """

    spending = db.find_one({'_id': ObjectId(id)})

    return jsonify({
        '_id': str(ObjectId(spending['_id'])),
        'date': spending['date'],
        'category': spending['category'],
        'description': spending['description'],
        'amount': spending['amount']
    })


@app.route('/api/<id>', methods=['DELETE'])
def delete_spending(id):
    """ DELETE Spending by ID """

    db.delete_one({'_id': ObjectId(id)})

    return jsonify(message='Spending Deleted')


@app.route('/api/<id>', methods=['PUT'])
def update_spending(id):
    """  Update Spending by ID """

    db.update_one(
        {'_id': ObjectId(id)},
        {"$set": {
            'date': request.json['date'],
            'category': request.json['category'],
            'description': request.json['description'],
            'amount': request.json['amount']
        }}
    )
    return jsonify({'message': 'Spending Updated'})


if __name__ == "__main__":
    app.run(debug=True, port=4000)
