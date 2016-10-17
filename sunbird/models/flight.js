class Flight {

  constructor(id, name="", image="",
    description="No description", fromPoint, toPoint,
    expirationDate, departure, duration, price=0.0) {

    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.fromPoint = fromPoint;
    this.toPoint = toPoint;
    this.expirationDate = expirationDate;
    this.departure = departure;
    this.duration = duration;
    this.price = price;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Flight;