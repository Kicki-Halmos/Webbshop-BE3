/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-filename-extension */
import React, { useReducer } from 'react';
import CartContext from '../contexts/cart-context';
import { cartApis } from '../api/api';

const { getCart, updateCart } = cartApis;

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'get_cart':
      let updatedTotalAmount = 0;
      action.items.map((item) => {
        let amount = 0;
        if (item.quantity === 1) {
          amount += item.product.price;
        } else {
          amount += (item.product.price * item.quantity);
        }
        // eslint-disable-next-line no-return-assign
        return updatedTotalAmount += amount;
      });
      return {
        items: action.items,
        totalAmount: updatedTotalAmount,
      };
    default: return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const getCartHandler = async () => {
    try {
      const cart = await getCart();
      dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartHandler = async (product, quantity, val) => {
    try {
      const cart = await updateCart(product, quantity, val);
      dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  /* const removeProductFromCartHandler = async (product, quantity, remove) => {
    try {
      const cart = await updateCart(product, quantity, remove);
      dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
    } catch (error) {
      console.log(error);
    }
  }; */

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    getCart: getCartHandler,
    updateCart: updateCartHandler,

  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
