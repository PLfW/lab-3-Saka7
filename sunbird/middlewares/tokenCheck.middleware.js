const config = require('../config');
const jwt = require('jsonwebtoken');

const tokenCheck = (req, res, next) => {

  let token = req.body.token
    || req.query.token
    || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, config.get('jwt:secret'),
      (err, decoded) => {
        if(err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
    });
  } else {
    return res.status(403).send({
        success: false, 
        message: 'No token provided.'
    });
    
  }
};

module.exports = tokenCheck;