import { question, promptCLLoop } from 'readline-sync';
import { User } from './models/user';

console.log('Welcome to the Social Network!');
let user;

promptCLLoop({
  signup: function (username) {
    const password = question('Enter password: ', {
      hideEchoBack: true,
    });
    user = new User(username, password);
    user.signup();

  },
  login: function (username) {
    const password = question('Enter password: ', {
      hideEchoBack: true,
    });
    user = new User(username, password);
    user.login();
  },
  post: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  follow: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  reply: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  upvote: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  downvote: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  shownewsfeed: function (target) {
    console.log(target + ' is removed.');
    // Do something...
  },
  quit: function () {
    return true;
  },
});
