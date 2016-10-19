const db = require('./connection');

class FlightRepository {

  constructor() {
    this.FIND_BY_ID = `SELECT * 
      FROM flights 
      WHERE id = $1;`;

    this.FIND_BY_ID_WITH_DESTINATIONS = 
       `SELECT 
        f.id,
        f.name,
        f.image,
        df.country || ' ' || df.city AS "from",
        dt.country || ' ' || dt.city AS "to",
        f.expiration_date,
        f.departure,
        f.duration,
        f.price,
        f.description
      FROM flights AS f
      JOIN destinations AS df ON f.from_point = df.id
      JOIN destinations AS dt ON f.to_point = dt.id
      WHERE f.id = $1`;

    this.FIND_BY_NAME = `SELECT * 
      FROM flights 
      WHERE name = $1;`;

    this.FIND_ALL = `SELECT * FROM flights;`; 

    this.FIND_ALL_WITH_DESTINATIONS = `
      SELECT 
        f.id,
        f.name,
        f.image,
        df.country || ' ' || df.city AS "from",
        dt.country || ' ' || dt.city AS "to",
        f.expiration_date,
        f.departure,
        f.duration,
        f.price,
        f.description
      FROM flights AS f
      JOIN destinations AS df ON f.from_point = df.id
      JOIN destinations AS dt ON f.to_point = dt.id
      ORDER BY f.expiration_date`;
   
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

  findAll(options) {
    if(!!options && options.withDestinations) {
      return db.any(this.FIND_ALL_WITH_DESTINATIONS);
    } else {
      return db.any(this.FIND_ALL);
    }
  }

  findOne(id, options) {
    if(!!options && options.withDestinations) {
      return db.any(this.FIND_BY_ID_WITH_DESTINATIONS, id);
    } else {
      return db.any(this.FIND_BY_ID, id);
    }
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