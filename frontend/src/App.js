import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './Components/ProductList';

function App() {
  return (
    <div className='App'>
      <h1>The Market</h1>
      <ProductList />
    </div>
  );
}

export default App;
