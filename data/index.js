const { PRODUCTS } = require('../seeder');

// Seeding data
const products = [...PRODUCTS];
const orders = [];

module.exports = { products, orders };
