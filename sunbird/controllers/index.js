const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/login', (req, res) => {
  res.render('pages/login', {
    page: "login",
    isAuthorized: false
  });
});

router.get('/signup', (req, res) => {
  res.render('pages/signup', {
    page: "signup",
    isAuthorized: false
  });
});

router.get('/logout', (req, res) => {
  res.render('pages/index');
});

router.get('/account', (req, res) => {
  res.render('pages/account', {
    page: "account",
    isAuthorized: false
  });
});

router.get('/orders', (req, res) => {
  res.render('pages/orders', {
    page: "orders",
    isAuthorized: false
  });
});

router.get('/flights', (req, res) => {
  res.render('pages/flights', {
    page: "flights",
    isAuthorized: false
  });
});

router.get('/flight?:id', (req, res) => {
  res.render('pages/flight', {
    page: "flight",
    isAuthorized: false
  });
});

router.get('/edit-users', (req, res) => {
  res.render('pages/edit-users', {
    page: "edit-users",
    isAuthorized: false
  });
});

router.get('/edit-destinations', (req, res) => {
  res.render('pages/edit-destinations', {
    page: "edit-destinations",
    isAuthorized: false,
  });
});

router.get('/edit-flights', (req, res) => {
  res.render('pages/edit-flights', {
    page: "edit-flights",
    isAuthorized: false
  });
});

router.get('/edit-orders', (req, res) => {
  res.render('pages/edit-orders', {
    page: "edit-orders",
    isAuthorized: false
  });
})

module.exports = router;
