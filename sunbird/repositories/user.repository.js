const db = require('./connection');
const passwordHash = require('password-hash');

class UserRepository {

  constructor() {
    this.FIND_BY_ID = `SELECT * 
      FROM users
      WHERE id = $1;`;

    this.FIND_BY_NAME = `SELECT * 
      FROM users
      WHERE first_name = $1;`;

    this.FIND_BY_EMAIL = `SELECT * 
      FROM users
      WHERE email = $1;`;

    this.FIND_ALL = `SELECT * FROM users;`; 

    this.GET_ORDERS = 
    `SELECT 
      o.id,
      f.name,
      df.country || ' ' || df.city AS "from",
      dt.country || ' ' || dt.city AS "to",
      f.departure,
      f.price,
      o.is_paid,
      o.is_rejected
    FROM users AS u
    JOIN orders AS o ON u.id = o.user_id
    JOIN flights AS f ON f.id = o.flight_id
    JOIN destinations AS df ON f.from_point = df.id
    JOIN destinations AS dt ON f.to_point = dt.id`;
    
    this.INSERT = `INSERT INTO users(type, first_name, second_name,
      email, password, phone, image, bio)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
    
    this.UPDATE = `UPDATE users 
      SET type = $2,
      first_name = $3,
      second_name = $4,
      email = $5,
      password = $6,
      phone = $7,
      image = $8,
      bio = $9
      WHERE id = $1;`;

    this.DELETE = `
      DELETE FROM orders
      WHERE user_id = $1;

      DELETE FROM users
      WHERE id = $1;`;
  }

  findAll() {
    return db.any(this.FIND_ALL);
  }

  findOne(id) {
    return db.any(this.FIND_BY_ID, id);
  }

  findByName(name) {
    return db.any(this.FIND_BY_NAME, name);
  }

  findByEmail(email) {
    return db.any(this.FIND_BY_EMAIL, email);
  }

  getOrdersByUserId(id) {
    return db.any(this.GET_ORDERS, id);
  }

  add(user) {
    return db.tx(transaction => {
      return transaction.none(this.INSERT, [
        user.type || "CUSTOMER",
        user.first_name || "____",
        user.second_name,
        user.email || "_______",
        passwordHash.generate(user.password || "******"),
        user.phone,
        user.image,
        user.bio
      ]);
    });
  }

  save(id, user) {
    if(!id) throw new Error("id must be supplied");

    return db.tx(transaction => {
      return db.none(this.UPDATE, [
        id,
        user.type || "CUSTOMER",
        user.first_name || "____",
        user.second_name,
        user.email || "_______",
        passwordHash.generate(user.password || "******"),
        user.phone,
        user.image,
        user.bio
      ]);
    });
  }

  delete(id) {
    return db.tx(transaction => {
      return db.none(this.DELETE, id);
    });
  }

}

module.exports = UserRepository;