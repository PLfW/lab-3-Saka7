const db = require('./connection');

class DestinationRepository {

  constructor() {
    this.FIND_BY_ID = `SELECT * 
      FROM destinations 
      WHERE id = $1;`;

    this.FIND_ALL = `SELECT * FROM destinations;`; 
    
    this.INSERT = `INSERT INTO destinations(country, city) VALUES($1, $2);`;
    
    this.UPDATE = `UPDATE destinations 
      SET country = $2,
      city = $3
      WHERE id = $1;`;

    this.DELETE = `
      DELETE FROM flights 
      WHERE from_point = $1 OR to_point = $1;

      DELETE FROM destinations WHERE id = $1;`;
  }

  findAll() {
    return db.any(this.FIND_ALL);
  }

  findOne(id) {
    return db.any(this.FIND_BY_ID, id);
  }

  add(destination) {
    return db.tx(transaction => {
      return transaction.none(this.INSERT, [
        destination.country || '____',
        destination.city || '____'
      ]);
    });
  }

  save(id, destination) {
    if(!id) throw new Error("id must be supplied");

    return db.tx(transaction => {
      return db.none(this.UPDATE, [
        id,
        destination.country || '____',
        destination.city || '____'
      ]);
    });
  }

  delete(id) {
    return db.tx(transaction => {
      return db.none(this.DELETE, id);
    });
  }

}

module.exports = DestinationRepository;