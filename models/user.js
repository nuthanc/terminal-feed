class User {
  constructor(db) {
    this.db = db;
    this.sessionId = null;
  }

  async signup(username, password) {
    let sql;
    try {
      sql = `INSERT INTO Users (username, password) VALUES (?, ?)`;
      let params = [username, password];
      const userId = await this.db.run(sql, params);
      await this.createSession(userId);
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
      await this.createSession(row.id);
      console.log(`Welcome ${username}!\n`);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }

  async createSession(userId) {
    let sql;
    try {
      sql = `INSERT INTO Sessions (user_id) VALUES (?)`;
      const params = [userId];
      this.sessionId = await this.db.run(sql, params);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }
}

module.exports = User;
