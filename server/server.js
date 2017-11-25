/*jshint esversion: 6 */

const express = require('express'),
  bodyParser = require('body-parser'),
  {ObjectID} = require('mongodb'),
  _ = require('lodash');

const {mongoose} = require('./db/mongoose'),
  {Todo} = require('./models/todo'),
  {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

// Get all
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// Get one by id
// colon followed by a name is the pattern for mongo ids?
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Id not found');
    }
    // Can send todo not as an object, but more useful to send it as
    // an object. Below = {todo: todo}
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Delete one by id
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid from del one by id');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('ID not found (from delete one by id)');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Something went wrong in del one by id');
  });
});

// Update one record (Unlike PUT, which replaces the whole record, PATCH
// allows of updating only select fields - the ones we pick off with lodash, below)
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  // lodash pick allows us to pick things off the body object for updating
  // the other properties (user id, completed at, etc.) not for the user to update
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid from app.patch');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    // getTime sets a number w/ milliseconds since 1/1/70
    body.completedAt = new Date().getTime();
  } else {
    body.completed  = false;
    // reset time to null if no completion (ie, if user unchecks todo)
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
