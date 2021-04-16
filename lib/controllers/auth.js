const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const UserService = require('../services/UserService');
const { sign } = require('../utils/jwt');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
      // attach cookie to the browser - browser will store cookie in the cookie jar - set cookie header
      // 1st arg is cookie name
      // 2nd arg is the cookie value
      // 3rd arg is security options

      // jwt utils returned user properties only (plain js object), already removed the methods and class.
      .then(user => res.cookie('session', sign(user), {
        // only our server can read the cookie
        // FE can't interact with the JWT or see the value of the JWT 
        // cookie has a domain attached and the browser will only send it to the apps server
        // similar to react-cookie npm 
        httpOnly: true,
        // max age is in milliseconds and gives expiration date
        // user needs to signin again after x amount of time
        maxAge: ONE_DAY_IN_MS,
        // sameSite none - means two diff websites can send cookies back and forth. FE and BE don't need to be on the same url. This is good if FE is on netlify and BE on heroku 
        // sameSite strict - FE and BE must be on the same site. For localhost this will work. Need to be on same site even with fetch req.
        // sameSite Lax - default cookie behavior. If your app set the cookie, you'll still receive the cookie.  
        sameSite: 'strict',
      }))
      .then((user) => res.redirect('/'))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    console.log(req.user, 'REQ USER VERIFY')
    // send the currently logged in user back to the browser 
    res.send(req.user);
  });
