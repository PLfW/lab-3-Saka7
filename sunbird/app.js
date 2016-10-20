const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const favicon = require('serve-favicon');

const config = require('./config');

const index = require('./controllers/index');
const authController = require('./controllers/auth.controller.js');
const userController = require('./controllers/user.controller');
const destinationController = require('./controllers/destination.controller');
const flightController = require('./controllers/flight.controller');
const orderController = require('./controllers/order.controller');

const tokenCheck = require('./middlewares/tokenCheck.middleware');
const ErrorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.set('secret', config.get('jwt:secret'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/auth', authController);

app.use(tokenCheck);

app.use('/api/users', userController);
app.use('/api/destinations', destinationController);
app.use('/api/flights', flightController);
app.use('/api/orders', orderController);

app.use(ErrorHandler.notFound);
app.use(ErrorHandler.internal);

module.exports = app;
