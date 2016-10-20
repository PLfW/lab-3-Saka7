const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/signup', (req, res) => {
  res.render('pages/signup');
});

router.get('/logout', (req, res) => {
  res.render('pages/index');
});

router.get('/account', (req, res) => {
  res.render('pages/account');
});

router.get('/orders', (req, res) => {
  res.render('pages/orders');
});

router.get('/flights', (req, res) => {
  res.render('pages/flights');
});

router.get('/flight?:id', (req, res) => {
  res.render('pages/flight');
});

router.get('/edit-users', (req, res) => {
  res.render('pages/edit-users');
});

router.get('/edit-destinations', (req, res) => {
  res.render('pages/edit-destinations');
});

router.get('/edit-flights', (req, res) => {
  res.render('pages/edit-flights');
});

router.get('/edit-orders', (req, res) => {
  res.render('pages/edit-orders');
})

module.exports = router;
