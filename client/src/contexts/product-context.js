import React from 'react';

const ProductContext = React.createContext({
  products: [],
  oneProduct: {},
  getProducts: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  getOneProduct: () => {},
});

export default ProductContext;
