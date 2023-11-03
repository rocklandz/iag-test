import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const URI = `http://localhost:3000`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${URI}/products`);
        setProducts(data.products);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, event) => {
    const updatedProds = products.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity || 0 + +event.target.value;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setProducts(updatedProds);
  };

  useEffect(() => {
    if (!products.length) {
      setTotal(0);
      return;
    }
    setTotal(products.reduce((a, b) => a + b.price * b.quantity || 0, 0));
  }, [products]);

  return (
    <>
      <Grid container spacing={2}>
        {products.length &&
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Typography variant='h6'>{product.name}</Typography>
              <Typography variant='subtitle1'>
                Price: ${product.price}
              </Typography>
              <TextField
                label='Select Quantity'
                type='number'
                variant='outlined'
                value={
                  products.find((item) => item.id === product.id)?.quantity
                }
                onChange={(e) => handleQuantityChange(product.id, e)}
              />
            </Grid>
          ))}
      </Grid>

      <Grid container marginTop={2} spacing={2}>
        <Grid item>
          <Typography>Total cost: ${total}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductList;
