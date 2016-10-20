const db = require('./connection');

class OrderRepository {

  constructor() {
    this.FIND_BY_ID = `
      SELECT * 
      FROM orders
      WHERE id = $1;`;

    this.FIND_ALL = `SELECT * FROM orders;`; 
   
    this.INSERT = `
      INSERT INTO orders(user_id, flight_id, applying_time,
        paying_time, rejection_time, is_paid, is_rejected) 
      VALUES($1, $2, $3, $4, $5, $6, $7);`;
    
    this.UPDATE = `UPDATE orders 
      SET user_id = $2,
      flight_id = $3,
      applying_time = $4,
      paying_time = $5,
      rejection_time = $6,
      is_paid = $7,
      is_rejected = $8
      WHERE id = $1`;

    this.PAY = `
      UPDATE orders
      SET
        is_paid = true,
        is_rejected = false
      WHERE id = $1;`;
    this.REJECT = `
      UPDATE orders
      SET
        is_rejected = true,
        is_paid = false
      WHERE id = $1;`;

    this.DELETE = `DELETE FROM orders WHERE id = $1`;
  }

  findAll() {
    return db.any(this.FIND_ALL);
  }

  findOne(id) {
    return db.any(this.FIND_BY_ID, id);
  }

  add(order) {
    console.log(JSON.stringify(order));
    if(!order.user_id || !order.flight_id) {
      throw new Error("user id and flight id must be specified");
    }

    return db.tx(transaction => {
      return transaction.none(this.INSERT, [
        order.user_id,
        order.flight_id,
        order.applying_time || new Date(),
        order.paying_time,
        order.rejection_time,
        order.is_paid,
        order.is_rejected
      ]);
    });
  }

  save(id, order) {
    if(!id || !order.user_id || !order.flight_id) {
      throw new Error("order id, user id and flight id must be specified");
    }

    return db.tx(transaction => {
      return transaction.none(this.UPDATE, [
        id,
        order.user_id,
        order.flight_id,
        order.applying_time || new Date(),
        order.paying_time,
        order.rejection_time,
        order.is_paid,
        order.is_rejected
      ]);
    });
  }

  pay(id) {
    if(!id) {
      throw new Error("order id must be specified");
    }

    return db.tx(transaction => {
      return transaction.none(this.PAY, [id]);
    });
  }

  reject(id) {
    if(!id) {
      throw new Error("order id must be specified");
    }

    return db.tx(transaction => {
      return transaction.none(this.REJECT, [id]);
    });
  }

  delete(id) {
    return db.tx(transaction => {
      return db.none(this.DELETE, id);
    });
  }

}

module.exports = OrderRepository;