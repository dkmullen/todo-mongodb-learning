/*jshint esversion: 6 */
// This file contains examples of queries using mongoose

const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {User} = require('./../server/models/user');

let id = '5a16f1ee27c1fe70e6f9c526';
let userId = '5a156c85b1e58d7236b551ed';

if(!ObjectID.isValid(id)) {
  console.log('Id is not valid');
}

if(!ObjectID.isValid(userId)) {
  console.log('That User Id is not valid');
}

Todo.find({ // finds all that match, returns an array
  _id: id // no need to create a new ObjectID - mongoose does it
}).then((todos) => {
  console.log('Todos', todos);
});

/* Finds the first match, returns an object
  Therefore it is preferable to plain 'find' when you are looking for just
  one result. Returns null if none found (find returns an empty array)
*/
Todo.findOne({
  _id: id
  }).then((todo) => {
  console.log('Todo', todo);
});

// Use to find one object by id - very simple query
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('That user id not found');
  }
  console.log('User by Id', user);
}).catch((e) => console.log(e));
