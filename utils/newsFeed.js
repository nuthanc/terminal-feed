const moment = require('moment');

const commentsForPostQuery = `SELECT * FROM Comments
WHERE post_id = ?
`;

const newsFeedCallBack = async (row, db) => {
  const now = moment();
  const timeAgo = moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').from(now);
  console.log(
    `\n\n\nPOST ID: ${row.id}, UPVOTES: ${row.upvotes}, DOWNVOTES: ${row.downvotes}, COMMENTS: ${row.num_comments}`
  );
  console.log(`POSTED: ${timeAgo}`);
  console.log(`POST CONTENT: \n${row.text}\n`);
  const commentsForPostParams = [row.id];
  commentRows = await db.all(commentsForPostQuery, commentsForPostParams);
  for (const comment of commentRows) {
    const now = moment();
    const timeAgo = moment(comment.timestamp, 'YYYY-MM-DD HH:mm:ss').from(now);
    console.log(
      `COMMENT ID: ${comment.id}, UPVOTES: ${comment.upvotes}, DOWNVOTES: ${comment.downvotes}, PARENT COMMENT ID: ${comment.parent_comment_id}`
    );
    console.log(`POSTED: ${timeAgo}`);
    console.log(`COMMENT CONTENT: \n${comment.text}\n`);
  }
};

const showNewsFeedQuery = `SELECT p.*, (SELECT COUNT(*)
FROM Comments c WHERE c.post_id = p.id) AS num_comments,
(p.upvotes - p.downvotes) AS score
FROM
Posts p JOIN Follows f
ON f.follower_id = ? AND f.followee_id = p.user_id
ORDER BY f.followee_id DESC, score DESC, num_comments DESC, p.timestamp DESC`;

const validCommands = () => {
  console.log(`signup [username] [password]`);
  console.log(`login [username] [password]`);
  console.log(`post [feed]`);
  console.log(`follow [username]`);
  console.log(`reply [post/comment] [postId/commentId] [replyText]`);
  console.log(`upvote [post/comment] [postId/commentId]`);
  console.log(`downvote [post/comment] [postId/commentId]\n`);
}

module.exports = {
  newsFeedCallBack,
  showNewsFeedQuery,
  validCommands
};
