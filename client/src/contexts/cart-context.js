import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  getCart: () => {},
  updateCart: () => {},
  removeProduct: () => {},
  deleteCart: () => {},
});

export default CartContext;
