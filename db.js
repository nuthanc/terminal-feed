import { Database } from 'sqlite3';

class AppDb {
  constructor() {
    this.db = new Database(':memory:');
  }

  run(sql, params = []) {
    this.db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
      }
    });
  }

  static getInstance() {
    if (!AppDb.instance) {
      AppDb.instance = new AppDb();
    }
    return AppDb.instance;
  }
}

export default AppDb.getInstance();
