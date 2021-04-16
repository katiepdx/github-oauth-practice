const { verify } = require('../utils/jwt');

module.exports = (req, res, next) => {
  // get cookies off the req using the cookie name (sessions here)

  try {
    const { session } = req.cookies;
    //  check session cookie is signed by the app (us)
    const user = verify(session);

    // attach user with cookie to the req
    req.user = user;

    next();
  } catch {
    // throw an error if not signed by us
    next(err);
  }
};
