const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Tweet = require('../models/Tweet');

module.exports = Router()
  // run req through ensureAuth middleware
  .post('/', ensureAuth, (req, res, next) => {
    Tweet
      .insert({
        text: req.body.text,
        username: req.user.username
      })
      .then(tweet => res.send(tweet))
      .catch(next);
  });
