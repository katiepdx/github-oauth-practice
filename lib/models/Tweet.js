const pool = require('../utils/pool');
module.exports = class Tweet {
  id;
  text;
  username;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.username = row.username;
  }

  // add a tweet
  static async insert({ text, username }) {
    const { rows } = await pool.query(`
      INSERT INTO tweets (text, username)
      VALUES ($1, $2) 
      RETURNING *
      `, [text, username]);
    return new Tweet(rows[0]);
  }

  // get all tweets for a username
  static async getTweetsByUsername(username) {
    const { rows } = await pool.query(`
    SELECT 
    username, 

    -- array of all the tweets for a user. Rename using AS
    json_agg(text) AS tweets
    FROM users
    
    INNER JOIN tweets ON users.github_username = tweets.username
    
    WHERE username = $1

    -- bucket by username
    GROUP BY username
    `, [username]);

    // return the first item since json agg puts all tweets into an array
    return rows[0];
  }

};
