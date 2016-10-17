const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/index', {
    page: "index",
    isAuthorized: false
  });
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

router.get('/flights?:id(\\d)', (req, res, next) => {
  res.render('pages/flight', {
    page: "flight",
    isAuthorized: false
  });
});

router.get('/edit-users', (req, res, next) => {
  res.render('pages/edit-users', {
    page: "edit-users",
    isAuthorized: false
  });
});

router.get('/edit-destinations', (req, res, next) => {
  res.render('pages/edit-destinations', {
    page: "edit-destinations",
    isAuthorized: false
  });
});

router.get('/edit-flights', (req, res, next) => {
  res.render('pages/edit-flights', {
    page: "edit-flights",
    isAuthorized: false
  });
});

router.get('/edit-orders', (req, res, next) => {
  res.render('pages/edit-orders', {
    page: "edit-orders",
    isAuthorized: false
  });
})

module.exports = router;
