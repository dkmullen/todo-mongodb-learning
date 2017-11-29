/*jshint esversion: 6 */

let mongoose = require('mongoose');

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
  },
  _creator: { // underscore signifies this is an object id
    type: mongoose.Schema.Types.ObjectId,
    required: true // Gotta be logged in to interact with a todo
  }
});

module.exports = {Todo};
