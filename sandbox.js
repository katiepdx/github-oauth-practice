const jwt = require('jsonwebtoken');

// sign takes: 
// 1. a payload 
// 2. a secret unique to your app to prove it's your server - goes in .env 
// 3. config options - expiresIn can accept 24hr or time in seconds 

// Note: JWTs are NOT secure. The payload is readable even without the JWT secret (jwt.io)
// lets us see who created the JWT 
// note: "iat" is issued at

const token = jwt.sign({ name: 'spot', age: 5, weight: '20lbs' }, 'JWT_PASSWORD', { expiresIn: '24hr' });

// receive back a token
console.log(token, 'TOKEN');


// VERIFYING PAYLOAD - verifying that this is the person who created the token using the password
const payload = jwt.verify(token, 'JWT_PASSWORD');

// if password is incorrect then you get an JWT error of "invalid signature"
// INCORRECT: const payload = jwt.verify(token, 'WRONG_JWT_PASSWORD');
// "token expired" error if token has expired

// returns the payload with the "iat" and "exp"
console.log('payload after jwt token is verified using the password', payload);


// EXAMPLE USE: 
// jwt sign - create a jwt for a user on login
// jwt verify - verify user each time
