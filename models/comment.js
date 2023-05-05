class Comment {
  constructor(userId, postId, db) {
    this.userId = userId;
    this.db = db;
    this.postId = postId;
  }

  async post(feed) {
    const sql = `INSERT INTO Posts (user_id, text) VALUES (?, ?)`;
    const params = [this.currentUser.id, feed];

    try {
      this.db.run(sql, params);
      console.log(`Post created successfully\n`);
    } catch (err) {
      console.error(err.message);
    }
  }
}
