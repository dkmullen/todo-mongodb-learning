/*jshint esversion: 6 */

// specifiy the MongoClient feature of the larger mongo package
const MongoClient = require('mongodb').MongoClient;

// In mongo, you can connect to a db that you haven't created yet;
// Mongo creates it when you add a document
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // Using return here to end the function, making else unnecessary
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: 'false'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Joker',
    age: 19,
    location: 'Da Nang'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to create user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
