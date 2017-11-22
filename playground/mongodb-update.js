/*jshint esversion: 6 */

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a14af786e08708f5569e28d')
  // },
  //   { $set: { completed: true } },
  //   { returnOriginal: false })
  //   .then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a14b0e86e08708f5569e2fc')
  },
    { $set: { name: 'Dennis' },
      $inc: {age: 27}},
    { returnOriginal: false })
    .then({ $inc: { age: 3 } })
    .then((result) => {
    console.log(result);
  });

  // db.close();
});
