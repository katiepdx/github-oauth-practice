const jwt = require('jsonwebtoken');

const sign = (payload) => {
  // jwt.sign() accepts a plain js object, can't accept a class
  // { ...payload } - Payload is received as a class - User model class instance (w row from db). 
  // Need a Plain Javascript object - takes away the methods off of the User class and just keeps the properties (username and photoUrl)
  return jwt.sign({ ...payload }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
};

const verify = (token) => {
  return jwt.verify(token, process.env.APP_SECRET);
};

module.exports = { sign, verify };
