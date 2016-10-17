const db = require('./connection');

class FlightRepository {

  constructor() {
    this.FIND_BY_ID = `SELECT * 
      FROM flights 
      WHERE id = $1;`;

    this.FIND_BY_NAME = `SELECT * 
      FROM flights 
      WHERE name = $1;`;

    this.FIND_ALL = `SELECT * FROM flights;`; 
   
    this.INSERT = `INSERT INTO flights(name, image, description, 
        fromPoint, toPoint, expirationDate, departure, duration, price)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    
    this.UPDATE = `UPDATE flights 
      SET name = $2,
      image = $3,
      description = $4,
      fromPoint = $5,
      toPoint = $6,
      expirationDate = $7,
      departure = $8,
      duration = &9,
      price = $10,
      WHERE id = $1;`;

    this.DELETE = `
      DELETE FROM orders
      WHERE flight_id = $1;

      DELETE FROM flights 
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

  add(flight) {
    return db.tx(transaction => {
      return transaction.none(this.INSERT, [
        flight.name || "____",
        flight.image || "____",
        flight.description || "_______",
        flight.fromPoint || 2,
        flight.toPoint || 3,
        flight.expirationDate || new Date().now(),
        flight.departure || new Date().now(),
        flight.duration || 1,
        flight.price || 1000.0
      ]);
    });
  }

  save(id, flight) {
    if(!id) throw new Error("id must be supplied");

    return db.tx(transaction => {
      return db.none(this.UPDATE, [
        id,
        flight.name || "____",
        flight.image || "____",
        flight.description || "_______",
        flight.fromPoint || 2,
        flight.toPoint || 3,
        flight.expirationDate || new Date().now(),
        flight.departure || new Date().now(),
        flight.duration || 1,
        flight.price || 1000.0
      ]);
    });
  }

  delete(id) {
    return db.tx(transaction => {
      return db.none(this.DELETE, id);
    });
  }

}

module.exports = FlightRepository;