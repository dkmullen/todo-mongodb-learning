/*jshint esversion: 6 */

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //removes leading and trailing whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// let newTodo = new Todo({
//   text: 'Feed the hog'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo');
// });

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

let newUser = new User({
  email: '  joker@usmc.mil'
});

newUser.save().then((user) => {
  console.log('Saved user', JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log('Unable to save user');
});
