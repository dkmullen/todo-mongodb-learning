/*jshint esversion: 6 */

let {User} = require('./../models/user');

let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); // runs the catch case below
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => { // runs when authentication fails
    res.status(401).send(); // 401 = authentication required
  });
};

module.exports = {authenticate};
