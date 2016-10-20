const passwordHash = require('password-hash');
const express = require('express');
const router = express.Router();

const User = require("../models/user");
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();

router.get('/', (req, res) => {
  userRepository.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)', (req, res) => {
  userRepository.findOne(req.params.id)
   .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)/orders', (req, res) => {
  userRepository.getOrderByUserId(req.params.id)
   .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:name(\\w+)', (req, res) => {
  userRepository.findByName(req.params.name)
   .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:email(.+\@.+\..+)', (req, res) => {
  userRepository.findByEmail(req.params.email)
   .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/', (req, res) => {
  let user = req.body;
  if(user.password) {
    user.password = passwordHash.generate(user.password);
  } else {
    res.json({"error": "password must be suplied"});
  }

  userRepository.add(user)
    .then(() => {
      res.json({message: "added"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.put('/:id(\\d+)', (req, res) => {
  userRepository.save(req.params.id, req.body)
    .then(() => {
      res.json({message: "saved"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/:id(\\d+)', (req, res) => {
  userRepository.delete(req.params.id)
    .then(() => {
      res.json({message: "deleted"});
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
