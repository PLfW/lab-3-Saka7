const express = require('express');
const router = express.Router();

const Flight = require("../models/flight");
const FlightRepository = require("../repositories/flight.repository");
const flightRepository = new FlightRepository();

router.get('/', (req, res) => {
  flightRepository.findAll()
    .then(flights => {
      res.json(flights);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/verbose', (req, res) => {
  flightRepository.findAll({withDestinations: true})
    .then(flights => {
      res.json(flights);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)', (req, res) => {
  flightRepository.findOne(req.params.id)
   .then(flight => {
      res.json(flight);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)/verbose', (req, res) => {
  flightRepository.findOne(req.params.id, {withDestinations: true})
   .then(flight => {
      res.json(flight);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:name(\\w+)', (req, res) => {
  flightRepository.findByName(req.params.name)
   .then(flight => {
      res.json(flight);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/', (req, res) => {
  flightRepository.add(req.body)
    .then(() => {
      res.json({message: "added"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.put('/:id(\\d+)', (req, res) => {
  flightRepository.save(req.params.id, req.body)
    .then(() => {
      res.json({message: "saved"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/:id(\\d+)', (req, res) => {
  flightRepository.delete(req.params.id)
    .then(() => {
      res.json({message: "deleted"});
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
