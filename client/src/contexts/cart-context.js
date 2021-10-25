import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalCost: 0,
  addCart: () => {},
  getCart: () => {},
  updateCart: () => {},
  deleteCart: () => {},
});

export default CartContext;
