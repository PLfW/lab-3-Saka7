const express = require('express');
const router = express.Router();

const DestinationRepository = require('../repositories/destination.repository');
const OrderRepository = require('../repositories/order.repository.js');
const UserRepository = require('../repositories/user.repository');
const FlightRepository = require('../repositories/flight.repository');

const destinationRepository = new DestinationRepository();
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const flightRepository = new FlightRepository();

router.get('/', (req, res, next) => {
  res.redirect('/flights');
});

router.get('/login', (req, res, next) => {
  res.render('pages/login', {
    page: "login",
    isAuthorized: false
  });
});

router.get('/signup', (req, res, next) => {
  res.render('pages/signup', {
    page: "signup",
    isAuthorized: false
  });
});

router.get('/logout', (req, res, next) => {
  res.render('pages/index');
});

router.get('/account', (req, res, next) => {
  res.render('pages/account', {
    page: "account",
    isAuthorized: false
  });
});

router.get('/orders', (req, res, next) => {
  res.render('pages/orders', {
    page: "orders",
    isAuthorized: false
  });
});

router.get('/flights', (req, res, next) => {
  res.render('pages/flights', {
    page: "flights",
    isAuthorized: false
  });
});

router.get('/flight?:id', (req, res, next) => {
  res.render('pages/flight', {
    page: "flight",
    isAuthorized: false
  });
});

router.get('/edit-users', (req, res, next) => {
  userRepository.findAll().then(users => {
    res.render('pages/edit-users', {
      "users": users,
      page: "edit-users",
      isAuthorized: false
    });
  });
});

router.get('/edit-destinations', (req, res, next) => {
  destinationRepository.findAll().then(destinations => {
    res.render('pages/edit-destinations', {
      "destinations": destinations,
      page: "edit-destinations",
      isAuthorized: false,
    });
  });
});

router.get('/edit-flights', (req, res, next) => {
  flightRepository.findAll().then(flights => {
    res.render('pages/edit-flights', {
      "flights": flights,
      page: "edit-flights",
      isAuthorized: false
    });
  });
});

router.get('/edit-orders', (req, res, next) => {
  orderRepository.findAll().then(orders => {
    res.render('pages/edit-orders', {
      "orders": orders,
      page: "edit-orders",
      isAuthorized: false
    });
  });
})

module.exports = router;
