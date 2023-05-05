class Post {
  constructor(userId, db) {
    this.userId = userId;
    this.db = db;
  }

  async post(feed) {
    const sql = `INSERT INTO Posts (user_id, text) VALUES (?, ?)`;
    const params = [this.userId, feed];

    try {
      this.db.run(sql, params);
      console.log(`Post created successfully\n`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async showNewsFeed() {
    const sql = `SELECT p.*, (SELECT COUNT(*) FROM Comments c WHERE c.post_id = p.id) AS num_comments,
                  (p.upvotes - p.downvotes) AS score
                  FROM
                  Posts p JOIN Follows f
                  ON f.follower_id = ? AND f.followee_id = p.user_id
                  ORDER BY f.followee_id DESC, score DESC, num_comments DESC, p.timestamp DESC`;

    const params = [this.userId];
    const callback = (row) => {
      console.log(
        `\nPOST ID: ${row.id}, UPVOTES: ${row.upvotes}, DOWNVOTES: ${row.downvotes}, COMMENTS: ${row.num_comments}`
      );
      console.log(`POSTED AT: ${row.timestamp}`);
      console.log(`POST CONTENT: \n${row.text}\n`);
    };
    try {
      await this.db.each(sql, params, callback);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = Post;
