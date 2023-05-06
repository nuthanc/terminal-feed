const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const AppDb = require('./db');
const readline = require('readline');
const newsFeedUtil = require('./utils/newsFeed');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to the Social Network!');
const appDb = new AppDb();
appDb.initializeDb().then(() => {
  newsFeedUtil.validCommands();
  const user = new User(appDb);

  rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');
    switch (command) {
      case 'signup':
        const [username, password] = args;
        user.signup(username, password);
        break;
      case 'login':
        const [usr, pwd] = args;
        user.login(usr, pwd);
        break;
      case 'post':
        if (user.sessionId) {
          const feed = args.join(' ');
          const post = new Post(user.id, appDb);
          post.createPost(feed);
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'follow':
        if (user.sessionId) {
          const username = args[0];
          user.follow(username);
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'reply':
        if (user.sessionId) {
          const [replyTo, id, ...commentText] = args;
          const text = commentText.join(' ');
          const comment = new Comment(user.id, appDb);
          if (replyTo === 'post') {
            comment.createCommentOnPost(id, text);
          } else if (replyTo === 'comment') {
            comment.createCommentOnComment(id, text);
          }
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'upvote':
        if (user.sessionId) {
          const [voteFor, id] = args;
          if (voteFor === 'post') {
            const post = new Post(user.id, appDb);
            post.vote(id, 'upvotes');
          } else if (voteFor === 'comment') {
            const comment = new Comment(user.id, appDb);
            comment.vote(id, 'upvotes');
          }
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'downvote':
        if (user.sessionId) {
          const [id, voteFor] = args;
          if (voteFor === 'post') {
            const post = new Post(user.id, appDb);
            post.vote(id, 'downvotes');
          } else if (voteFor === 'comment') {
            const comment = new Comment(user.id, appDb);
            comment.vote(id, 'downvotes');
          }
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'shownewsfeed':
        if (user.sessionId) {
          const post = new Post(user.id, appDb);
          post.showNewsFeed();
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'help':
        newsFeedUtil.validCommands();
        break;
      // TODO: Remove this later
      case 'q':
        const sql = args.join(' ');
        const params = [];
        appDb.db.all(sql, params, (err, rows) => {
          if (err) {
            console.log('Error running sql: ' + sql);
            console.log(err);
          } else {
            console.log(rows);
          }
        });
        break;
      default:
        console.log('Invalid command!');
        console.log('Check valid ones from below');
        newsFeedUtil.validCommands();
    }
  });
});
