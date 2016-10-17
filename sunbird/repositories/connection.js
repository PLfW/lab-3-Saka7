const pgp = require('pg-promise')({
  error: (error, e) => {
      if (e.cn) {
        console.log("CN:", e.cn);
        console.log("EVENT:", error.message || error);
      }
    }
  }
);

const CONNECTION = {
  port: '5432',
  database: 'sunbird',
  user: 'sysadmin',
  password: '1'
};

const db = pgp(CONNECTION);

module.exports = db;
