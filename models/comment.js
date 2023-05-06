class Comment {
  constructor(userId, db) {
    this.userId = userId;
    this.db = db;
  }

  async createCommentOnPost(postId, commentText) {
    const sql = `INSERT INTO Comments (user_id, post_id, text) VALUES (?, ?, ?)`;
    const params = [this.userId, postId, commentText];
    try {
      await this.db.run(sql, params);
      console.log(`Comment created successfully\n`);
    } catch (err) {
      if (err.message.includes('FOREIGN KEY constraint failed')) {
        console.error('Post ID is incorrect');
      } else {
        console.error(err.message);
      }
    }
  }

  async createCommentOnComment(parentCommentId, commentText) {
    try {
      const postId = await this.getPostID(parentCommentId);
      const sql = `INSERT INTO Comments (user_id, post_id, parent_comment_id, text) VALUES (?, ?, ?, ?)`;
      const params = [this.userId, postId, parentCommentId, commentText];
      await this.db.run(sql, params);
      console.log(`Comment created successfully\n`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getPostID(commentId) {
    const sql = `SELECT id FROM Comments WHERE id = ?`;
    const params = [commentId];
    let id;
    try {
      const row = await this.db.get(sql, params);
      if (!row) {
        console.log(`No posts for comment id ${commentId} \n`);
      } else {
        id = row?.id;
      }
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
      id = null;
    }
    return id;
  }

  async vote(commentId, voteType) {
    const sql = `UPDATE Comments SET ${voteType} = ${voteType} + 1 WHERE id = ?`;
    const params = [commentId];

    try {
      this.db.run(sql, params);
      console.log(`Post ${voteType}d successfully\n`);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = Comment;
