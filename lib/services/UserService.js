const { exchangeCodeForToken, getUserProfile } = require('../utils/github');
const User = require('../models/User');

module.exports = class UsersService {
  static async create(code) {
    // exchange code for access token
    const token = await exchangeCodeForToken(code);

    // get user profile from github - using the token from above
    const profile = await getUserProfile(token);

    // check if the user is already in the database
    const user = await User.findByUsername(profile.username);

    if (!user) {
      // if there is NOT a user in db already, add the user profile
      return User.insert(profile);
    } else {
      // if there is already a user, update the photo url
      console.log('User already in db. Updating photo url...');
      return User.update(profile);
    }
  }
};
