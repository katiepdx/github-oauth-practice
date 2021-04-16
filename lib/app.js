const express = require('express');
const app = express();

// express static - FE folder
app.use(express.static(`${__dirname}/../public`));

// cookie-parse - need to npm i - give sus access to the cookie and passes it along
// any cookie on incoming req is available using req.cookies.cookieName
// require and immediately invoke
app.use(require('cookie-parser')());

app.use(express.json());
app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/tweets', require('./controllers/tweets'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
