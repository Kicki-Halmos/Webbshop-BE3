/* eslint-disable react/jsx-filename-extension */
import React, { useReducer } from 'react';
import CartContext from '../contexts/cart-context';
import { cartApis } from '../api/api';

const { getCart } = cartApis;

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'get_cart': return {
      items: action.items,
      totalAmount: action.items.map((item) => {
        let amount = 0;
        if (item.quantity === 1) {
          amount += item.product.price;
        } else {
          amount += (item.product.price * item.quantity);
        }
        return amount;
      }),
    };
    default: return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const getCartHandler = async () => {
    try {
      const email = 'sara@katt.se';
      const cart = await getCart(email);
      dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    getCart: getCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
