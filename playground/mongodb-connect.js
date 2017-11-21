/*jshint esversion: 6 */

// specifiy the MongoClient feature of the larger mongo package
// const MongoClient = require('mongodb').MongoClient;
// Below is ES6 destructuring  - This command, with only the MongoClient property, is equivelent to the line above
const {MongoClient, ObjectID} = require('mongodb');

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

  // db.collection('Users').insertOne({
  //   name: 'Rafterman',
  //   age: 20,
  //   location: 'Da Nang'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to create user', err);
  //   }
  //   // result.ops is every doc created in this function
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

db.close();
});
