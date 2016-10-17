const express = require('express');
const router = express.Router();

const Destinations = require("../models/destination");
const DestinationsRepository = require("../repositories/destination.repository");
const destinationsRepository = new DestinationsRepository();

router.get('/', (req, res) => {
  destinationsRepository.findAll()
    .then(destinationss => {
      res.json(destinationss);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)', (req, res) => {
  destinationsRepository.findOne(req.params.id)
   .then(destinations => {
      res.json(destinations);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/', (req, res) => {
  destinationsRepository.add(req.body)
    .then(() => {
      res.json({message: "added"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.put('/:id(\\d+)', (req, res) => {
  destinationsRepository.save(req.params.id, req.body)
    .then(() => {
      res.json({message: "saved"});
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/:id(\\d+)', (req, res) => {
  destinationsRepository.delete(req.params.id)
    .then(() => {
      res.json({message: "deleted"});
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
