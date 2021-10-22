import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalCost: 0,
  getCart: () => {},
  updateCart: () => {},
  deleteCart: () => {},
});

export default CartContext;
