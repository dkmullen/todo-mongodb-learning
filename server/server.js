/*jshint esversion: 6 */

require('./config/config');

const express = require('express'),
  bodyParser = require('body-parser'),
  {ObjectID} = require('mongodb'),
  _ = require('lodash');

const {mongoose} = require('./db/mongoose'),
  {Todo} = require('./models/todo'),
  {User} = require('./models/user'),
  {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Direct app to puclic dir to find the files to serve (index, etc)
app.use(express.static(__dirname + './../public'));

// Make new todos with your _creator id
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

// Get all todos by the user with this _creator id
app.get('/todos', authenticate, (req, res) => {
  console.log(req);
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// Get one by id
// colon followed by a name is the pattern for mongo ids?
app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid');
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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
app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid from del one by id');
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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
app.patch('/todos/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// create a new user - probably shouldn't get a token here, only at login
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// retrieve your own user object (ie, in Postman)
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// login a pre-existing user
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

// log out by deleting token
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
