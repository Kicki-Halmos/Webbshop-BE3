import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  getCart: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteCart: () => {},
});

export default CartContext;
