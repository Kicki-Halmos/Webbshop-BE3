/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import CartContext from '../contexts/cart-context';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const { items, totalAmount } = cartCtx;

  // skriv en onchange function som uppdateras så fort summan uppdateras.

  useEffect(() => {
    cartCtx.getCart();
  }, []);

  items !== [] && console.log(items);
  totalAmount !== 0 && console.log(totalAmount);

  return (
    <div>This is my cart</div>
  );
};

export default Cart;
