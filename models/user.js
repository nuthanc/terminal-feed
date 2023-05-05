class User {
  constructor(db) {
    this.db = db;
    this.sessionId = null;
    this.id = null;
  }

  async signup(username, password) {
    let sql;
    try {
      sql = `INSERT INTO Users (username, password) VALUES (?, ?)`;
      let params = [username, password];
      const userId = await this.db.run(sql, params);
      this.sessionId = await this.createSession(userId);
      this.id = userId;
      console.log(`User ${username} created successfully\n`);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }

  async login(username, password) {
    let sql;
    try {
      sql = `SELECT id FROM Users WHERE username = ? AND password = ?`;
      let params = [username, password];
      const row = await this.db.get(sql, params);
      if (!row) {
        console.log('Invalid credentials\n');
        return;
      }
      this.sessionId = await this.createSession(row.id);
      if (!this.sessionId) {
        return;
      } else {
        this.id = row.id;
      }
      console.log(`Welcome ${username}!\n`);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }

  async createSession(userId) {
    let sql, sessionId;
    try {
      sql = `INSERT INTO Sessions (user_id) VALUES (?)`;
      const params = [userId];
      sessionId = await this.db.run(sql, params);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
      sessionId = null;
    }
    return sessionId;
  }

  async getUserIdByName(username) {
    let sql, id;
    try {
      sql = `SELECT id FROM Users WHERE username = ?`;
      const params = [username];
      const row = await this.db.get(sql, params);
      if (!row) {
        console.log(`No such user by username ${username} \n`);
      } else {
        id = row?.id;
      }
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
      id = null;
      console.log('i was inside catch block');
    }
    return id;
  }

  async follow(username) {
    let sql;
    try {
      const id = await this.getUserIdByName(username);
      if (!id) {
        return;
      }
      sql = `INSERT INTO Follows (follower_id, followee_id) VALUES (?, ?)`;
      const params = [this.id, id];
      await this.db.run(sql, params);
      console.log(`Followed {username} succesfully\n`);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }
}

module.exports = User;
