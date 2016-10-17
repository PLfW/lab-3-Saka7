class Destination {

  constructor(id, country="", city="") {
    this.id = id;
    this.country = country;
    this.city = city;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Destination;