const express = require('express');
const { products } = require('../data');
const router = express.Router();

// sample order: [{id: 1, quantity: 7}, {id: 2, quantity: 5}]

const createOrder = async (req, res) => {
  try {
    const { order } = req.body;

    let total = 0;
    let result = [];
    for (let item of order) {
      const product = products.find((p) => p.id === item.id);
      const price = product.price;
      const lineTotal = item.quantity * price;
      total += lineTotal;
      result.push({ ...product, quantity: item.quantity, lineTotal });
    }
    return res.status(201).json({
      total,
      items: result,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

router.post('/', createOrder);

module.exports = router;
