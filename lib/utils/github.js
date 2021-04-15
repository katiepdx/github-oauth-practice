const fetch = require('node-fetch');

const exchangeCodeForToken = (code) => {
  // client_id, client_secret, and code are required
  const reqBody = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  };

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
    .then(res => res.json())
    // destructure access token off the response
    // note: when using access token you are making a req on behalf of the user
    .then(({ access_token }) => access_token);
};

// get profile from github using the token
// token stored in memory
const getUserProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`
    }
  })
    .then((res) => res.json())
    // get the login and avatar_url from the response and set them to username and photoUrl
    .then(({ login, avatar_url }) => ({
      username: login,
      photoUrl: avatar_url
    }));
};

module.exports = {
  exchangeCodeForToken,
  getUserProfile
};
