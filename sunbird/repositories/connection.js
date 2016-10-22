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
  host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST || 'localhost',
  port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT || config.get('database:port'),
  database: 'adminpkd4qyv' || config.get('database:name'),
  user: config.get('database:user'),
  password: '6Psycdi1jgRW' || config.get('database:password')
};

const db = pgp(CONNECTION);

module.exports = db;
