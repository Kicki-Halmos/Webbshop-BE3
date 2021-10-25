import React from 'react';

const ProductContext = React.createContext({
  products: [],
  oneProduct: {},
  getProducts: () => {},
  getOneProduct: () => {},
  adminGetProducts: () => {},
  adminGetOneProduct: () => {},
  adminAddProduct: () => {},
  adminUpdateProduct: () => {},
  adminDeleteProduct: () => {},

});

export default ProductContext;
