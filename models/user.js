import db from '../db.js';

export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  signup() {
    const sql = `INSERT INTO Users (username, password) VALUES (?, ?)`;
    const params = [this.username, this.password];
    db.run(sql, params);
  }

  login() {
    const sql = `SELECT id FROM Users WHERE username = ? AND password = ?`;
    const params = [this.username, this.password];
  }
}
