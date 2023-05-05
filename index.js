const User = require('./models/user');
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
      default:
        console.log('Invalid command!');
    }
  });
});
