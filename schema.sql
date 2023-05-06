PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS Posts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  timestamp DATETIME DEFAULT (datetime('now','localtime')),
  FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  parent_comment_id INTEGER,
  text TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  timestamp DATETIME DEFAULT (datetime('now','localtime')),
  FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY(post_id) REFERENCES Posts(id) ON DELETE CASCADE,
  FOREIGN KEY(parent_comment_id) REFERENCES Comments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Follows (
  follower_id INTEGER NOT NULL,
  followee_id INTEGER NOT NULL,
  PRIMARY KEY(follower_id, followee_id),
  FOREIGN KEY(follower_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY(followee_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sessions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  timestamp DATETIME DEFAULT (datetime('now','localtime')),
  FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);


