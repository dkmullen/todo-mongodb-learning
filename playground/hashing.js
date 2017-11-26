/*jshint esversion: 6 */

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPW = '$2a$10$RO5v.DMxiE582oBLWu4nI.uu3Qq3iq3gHXqk9aRAT4/pJFbUHqu5u';

bcrypt.compare('123abc', hashedPW, (err, res) => {
  console.log(res);
});

// let data = {
//   id: 10
// };
//
// let token = jwt.sign(data, '123abc');
// console.log(token);
//
//
// let decoded = jwt.verify(token, '123abc');
// console.log('Decoded', decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
