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
  })

  // get all tweets for a user - no ensureAuth needed - tweets are public
  .get('/:username', (req, res, next) => {
    Tweet
      .getTweetsByUsername(req.params.username)
      .then(tweets => {
        if (!tweets) res.send({ message: 'Oops... could not find any tweets' });
        res.send(tweets);
      })
      .catch(next);
  });
