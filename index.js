// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const productsController = require('./controllers/products.controller.js');
const ordersController = require('./controllers/orders.controller.js');
const cors = require('cors');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/products', productsController);
app.use('/orders', ordersController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
