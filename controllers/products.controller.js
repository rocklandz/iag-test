const express = require('express');
const { products } = require('../data');
const router = express.Router();

const getProducts = async (req, res) => {
  res.status(200).json({
    products: products,
  });
};

const createProduct = async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      msg: 'You need to fill up the product name and price',
    });
  }
  try {
    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price,
    };
    products.push(newProduct);
    return res.status(201).json({
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;
