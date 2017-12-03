/*jshint esversion: 6 */

const mongoose = require('mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash'),
  bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () { // make user a JSON object
  let user = this,
    userObject = user.toObject();

// pick off only properties for return, exclude sensitive ones like token
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this; // ie, the current user
  let access = 'auth'; // set access status tot he one we look for
  let token = jwt.sign({_id: user._id.toHexString(), access},  process.env.JWT_SECRET).toString(); // make a token

  user.tokens.push({access, token}); // add acc status and token to the user object

  return user.save().then(() => { // save user with new creds
    return token; // reutrn token for use on front end
  });
};

UserSchema.methods.removeToken = function (token) {
  let user = this;

  return user.update({
     $pull: { // Mongoose operator to pull items out of an array
      tokens: {token}
     }
   });
};

UserSchema.statics.findByToken = function (token) {
  let User = this,
    decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
        resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};
