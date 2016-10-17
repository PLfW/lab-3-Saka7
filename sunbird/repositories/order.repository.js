const db = require('./connection');

class OrderRepository {

  constructor() {
    this.FIND_BY_ID = `SELECT * 
      FROM orders
      WHERE id = $1;`;

    this.FIND_ALL = `SELECT * FROM orders;`; 
   
    this.INSERT = `INSERT INTO orders(user_id, flight_id, applying_time,
      paying_time, rejection_time, is_paid, is_rejected)
      VALUES($1, $2, $3, $4, $5, $6, $7);`;
    
    this.UPDATE = `UPDATE orders 
      SET user_id = $2,
      flight_id = $3,
      applying_time = $4,
      paying_time = $5,
      rejection_time = $6,
      is_paid = $7,
      is_rejected = $8;
      WHERE id = $1`;

    this.DELETE = `DELETE FROM orders WHERE id = $1`;
  }

  findAll() {
    return db.any(this.FIND_ALL);
  }

  findOne(id) {
    return db.any(this.FIND_BY_ID, id);
  }

  add(order) {
    return db.tx(transaction => {
      return transaction.none(this.INSERT, [
        order.userId || 2,
        order.flightId || 2,
        order.applyingTime || new Date().now(),
        order.payingTime || new Date().now(),
        order.rejectionTime || new Date().now(),
        order.isPaid || false,
        order.isRejected || false
      ]);
    });
  }

  save(id, order) {
    if(!id) throw new Error("id must be supplied");

    return db.tx(transaction => {
      return db.none(this.UPDATE, [
        id,
        order.userId || 2,
        order.flightId || 2,
        order.applyingTime || new Date().now(),
        order.payingTime || new Date().now(),
        order.rejectionTime || new Date().now(),
        order.isPaid || false,
        order.isRejected || false
      ]);
    });
  }

  delete(id) {
    return db.tx(transaction => {
      return db.none(this.DELETE, id);
    });
  }

}

module.exports = OrderRepository;