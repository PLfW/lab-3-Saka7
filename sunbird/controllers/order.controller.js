const express = require('express');
const router = express.Router();

const Order = require("../models/order");
const OrderRepository = require("../repositories/order.repository");
const orderRepository = new OrderRepository();

router.get('/', (req, res) => {
  orderRepository.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get('/:id(\\d+)', (req, res) => {
  orderRepository.findOne(req.params.id)
   .then(order => {
      res.json(order);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/', (req, res) => {
  orderRepository.add(req.body)
    .then(() => {
      res.json({message: "added"});
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
});

router.put('/:id(\\d+)', (req, res) => {
  orderRepository.save(req.params.id, req.body)
    .then(() => {
      res.json({message: "saved"});
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
});

router.delete('/:id(\\d+)', (req, res) => {
  orderRepository.delete(req.params.id)
    .then(() => {
      res.json({message: "deleted"});
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
