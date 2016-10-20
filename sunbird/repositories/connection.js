const config = require('../config');

const pgp = require('pg-promise')({
  error: (error, e) => {
      if (e.cn) {
        console.error("CN:", e.cn);
        console.error("EVENT:", error.message || error);
      }
    }
  }
);

const CONNECTION = {
  port: config.get('database:port'),
  database: config.get('database:name'),
  user: config.get('database:user'),
  password: config.get('database:password')
};

const db = pgp(CONNECTION);

module.exports = db;
