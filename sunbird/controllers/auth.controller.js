const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();
const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

router.post('/login', (req, res) => {
  userRepository.findByEmail(req.body.email)
    .then(user => {
      if(user == []) {
        res.status(404);
        res.json({
          "error": "User with this email not found"
        });
      } else if(passwordHash.verify(req.body.password, user[0].password)) {

        let userData = {
          id: user[0].id,
          type: user[0].type
        };

        const token = jwt.sign(userData, config.get('jwt:secret'), {expiresIn: "24h"});
        console.log(token);

        res.json({
          message: "Logged in successfuly",
          "token": token
        });
      } else {
        res.status(403);
        res.json({"error": "Invalid password"});
      }
    }).catch(error => {
      console.error(error);
      res.json(error);
    });
});

router.post('/signup', (req, res) => {
  userRepository.findByEmail(req.body.email).then(user => {
    if(user == []) {
      res.json({
        message: "Error: user with this email already exists"
      });
    } else {
      userRepository.add(req.body).then(() => {

        userRepository.findByEmail(req.body.email).then(user => {

          let userData = {
            id: user.id,
            type: user.type
          };

          const token = jwt.sign(userData, config.get('jwt:secret'), {
            expiresIn: "24h"
          });
          console.log(token);

          res.json({
            message: "Successfuly signed up",
            "token": token
          });
        });

      }).catch(error => {
        console.error(error);
        res.json(error);
      });
    }
  });
});

module.exports = router;