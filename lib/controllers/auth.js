const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  // user goes to apps login page
  .get('/login', (req, res) => {
    // redirect uses query params
    // SCOPES: what access the app needs. read:user for access to users profile info

    // user is redirected to github to login
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`
    );
  })

  // github is redirects user back to app after logging in and getting a code
  .get('/login/callback', (req, res, next) => {
    // user CODE
    console.log(req.query, 'CODE');

    // code is used to get the access token in UserService
    UserService.create(req.query.code)
      .then(user => {
        // redirect user to login if user doesn't exist
        if (!user) res.redirect('http://localhost:7890/api/v1/auth/login');

        // send user back and display it
        res.send(user);
      })
      .catch(next);
  });
