const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();
const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

const VALID_EMAIL_REGEX = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const VALID_PASSWORD_REGEX = /^\S{6,}$/;
const VALID_USERNAME_REGEX = /^\w{4,}$/;

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if(!email || !email.trim(), !VALID_EMAIL_REGEX.test(email)) {
    res.status(403);
    res.json({
      "error": "Email is invalid"
    });
    res.end();
  }

  if(!password || !password.trim(), !VALID_PASSWORD_REGEX.test(email)) {
    res.status(403);
    res.json({
      "error": "Password is invalid (should contain at least 6 signs)"
    });
    res.end();
  }

  userRepository.findByEmail(req.body.email)
    .then(user => {
      if(user.length <= 0 || !user) {
        console.log(user);
        res.status(404);
        res.json({
          "error": "User with this email not found"
        });
        res.end();
      } else if(passwordHash.verify(req.body.password, user[0].password)) {

        let userData = {
          id: user[0].id,
          type: user[0].type
        };

        const token = jwt.sign(userData, config.get('jwt:secret'), {
          expiresIn: "24h"
        });

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
  let email = req.body.email;
  let firstName = req.body.first_name;
  let secondName = req.body.second_name;
  let password = req.body.password;

  let isEmailValid = !!email && !!email.trim()
    && VALID_EMAIL_REGEX.test(email);

  if(!isEmailValid) {
    res.status(403);
    res.json({
      "error": "Email is invalid"
    });
    res.end();
  }

  let isFirstNameValid = !!firstName && !!firstName.trim() 
    && VALID_USERNAME_REGEX.test(firstName);

  if(!isFirstNameValid) {
    res.status(403);
    res.json({
      "error": "First name is invalid"
    });
    res.end();
  }

  let isSecondNameValid = !!secondName && !!secondName.trim() 
    && VALID_USERNAME_REGEX.test(secondName);

  if(!isSecondNameValid) {
    res.status(403);
    res.json({
      "error": "Second name is invalid"
    });
    res.end();
  }

  let isPasswordValid = !!password && !!password.trim()
    && VALID_PASSWORD_REGEX.test(password);

  if(!isPasswordValid) {
    res.status(403);
    res.json({
      "error": "password is invalid"
    });
    res.end();
  }

  let isValid = isEmailValid && 
    isFirstNameValid &&
    isSecondNameValid &&
    isPasswordValid;

  if(!isValid) {
    res.status(403);
    res.json({
      "error": "Inputs are invalid"
    });
    res.end();
  }

  userRepository.findByEmail(req.body.email).then(user => {
    if(user.length > 0) {
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