const newsFeedUtils = require('../utils/newsFeed');
class Post {
  constructor(userId, db) {
    this.userId = userId;
    this.db = db;
  }

  async createPost(feed) {
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
    const sql = newsFeedUtils.showNewsFeedQuery;
    const params = [this.userId];
    try {
      const rows = await this.db.all(sql, params);
      for (const row of rows) {
        await newsFeedUtils.newsFeedCallBack(row, this.db);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async vote(postId, vote) {
    const sql = `UPDATE Posts SET ${vote} = ${vote} + 1 WHERE id = ?`;
    const params = [postId];

    try {
      this.db.run(sql, params);
      console.log(`Post ${vote}d successfully\n`);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = Post;
