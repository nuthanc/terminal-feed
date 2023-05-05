const User = require('./models/user');
const Post = require('./models/post');
const AppDb = require('./db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to the Social Network!');
const appDb = new AppDb();
appDb.initializeDb().then(() => {
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
          post.post(feed);
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
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'upvote':
        if (user.sessionId) {
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      case 'downvote':
        if (user.sessionId) {
        } else {
          console.log('You must be logged in to do this operation');
        }
        break;
      // case 'shownewsfeed':
      case 'snf':
        if (true) {
          const post = new Post(2, appDb);
          post.showNewsFeed();
        }
        // if (user.sessionId) {
        //   console.log(user.id);
        //   const post = new Post(user.id, appDb);
        //   post.showNewsFeed();
        // } 
        else {
          console.log('You must be logged in to do this operation');
        }
        break;
      default:
        console.log('Invalid command!');
    }
  });
});
