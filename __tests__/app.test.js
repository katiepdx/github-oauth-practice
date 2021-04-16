const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

// fake a user login - jest mocks always have arrow function and req res next
jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  // mock a fake test user
  req.user = {
    username: 'test_user_1',
    photoUrl: 'mockPhotoURL.png'
  };

  // go to next piece of middleware
  next();
});

describe('github-oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a tweet via POST for logged in user', async () => {
    // need a user in the db bc the username is the foreign key
    await User.insert({
      username: 'test_user_1',
      photoUrl: 'mockPhotoURL.png'
    });

    return request(app)
      .post('/api/v1/tweets')
      // dont want to send the username in POST body. BE uses cookie to find the username
      .send({ text: 'This is a tweet' })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          text: 'This is a tweet',
          // username comes from auth
          username: 'test_user_1'
        });
      });
  });
});
