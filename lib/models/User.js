const pool = require('../utils/pool');

module.exports = class User {
  username;
  photoUrl;

  constructor(row) {
    this.username = row.github_username;
    this.photoUrl = row.github_photo_url;
  }

  // add logged in user to db
  static async insert({ username, photoUrl }) {
    const { rows } = await pool.query(`
      INSERT INTO users (github_username, github_photo_url) 
      VALUES ($1, $2) RETURNING *`,
      [username, photoUrl]);
      
    return new User(rows[0]);
  }

  // get user by username
  static async findByUsername(username) {
    const { rows } = await pool.query(`
      SELECT * FROM users 
      WHERE github_username = $1`,
      [username]);

    // check for empty rows
    if (rows.length < 1) return null;

    // return user if there is a username in db
    return new User(rows[0]);
  }
};
