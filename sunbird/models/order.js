class Order {
  constructor(id, userId, flightId, 
    applyingTime, payingTime, rejectionTime,
    isPaid=false, isRejected=false) {

    this.id = id;
    this.userId = userId;
    this.flightId = flightId;
    this.applyingTime = applyingTime;
    this.payingTime = payingTime;
    this.rejectionTime = rejectionTime;
    this.isPaid = isPaid;
    this.isRejected = isRejected;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Order;