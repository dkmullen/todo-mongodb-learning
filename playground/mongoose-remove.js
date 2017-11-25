/*jshint esversion: 6 */
// This file contains examples of queries using mongoose

const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove - these both return the deleted object
// Todo.findByIdAndRemove - unlike remove, above

Todo.findByIdAndRemove('5a189d681323eefb5ad1b2a6').then((todo) => {
  console.log(todo);
});

// Works like the above
Todo.findOneAndRemove({_id: '5a189d681323eefb5ad1b2a6'}).then((todo) => {
  console.log(todo);
});
