const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class AppDb {
  constructor() {
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.log('Could not connect to database', err);
      } else {
        console.log('Connected to database');
      }
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  initializeDb() {
    return new Promise((resolve, reject) => {
      const schema = fs.readFileSync('schema.sql').toString();
      this.db.exec(schema, (err) => {
        if (err) {
          console.log('Error initializing database');
          reject(err);
        } else {
          console.log('Database initialized');
          resolve();
        }
      });
    });
  }
}

module.exports = AppDb;
