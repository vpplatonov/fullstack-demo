db.createUser(
    {
        user: "fullstack",
        pwd: "vivanaturals",
        roles: [{role: "readWrite", db: "fullstackdemo"}]
    }
)

db = db.getSiblingDB('fullstackdemo');
db.createCollection('spending_tracker');
db.spending_tracker.insertMany([
 {
    date: '2022-01-29',
    description: 'Take out from MacDonalds',
    category: 'food',
    amount: 25
  },
  {
    date: '2022-01-29',
    description: 'Phone bill',
    category: 'monthly bill',
    amount: 15
  },
  {
    date: '2022-01-29',
    description: 'Take out from MacDonalds',
    category: 'food',
    amount: 35
  }
]);