/* eslint-disable no-underscore-dangle */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-filename-extension */
import React, { useReducer, useContext } from 'react';
import CartContext from '../contexts/cart-context';
import { cartApis } from '../api/api';
import UserContext from '../contexts/user-context';

const {
  getCart, updateCart, deleteCart, addNewCart,
} = cartApis;

const defaultCartState = { items: [], totalCost: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'add_cart':
      return { items: [action.item], totalCost: action.item.price };
    case 'get_cart':
      let updatedTotalCost = 0;
      action.items.map((item) => {
        let cost = 0;
        if (item.quantity === 1) {
          cost += item.product.price;
        } else {
          cost += (item.product.price * item.quantity);
        }
        // eslint-disable-next-line no-return-assign
        return updatedTotalCost += cost;
      });
      return {
        items: action.items,
        totalCost: updatedTotalCost,
      };
    case 'delete_cart': return defaultCartState;
    default: return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  const userCtx = useContext(UserContext);

  const addCartHandler = async (product, quantity) => {
    try {
      const cart = await addNewCart(product, quantity);
      dispatchCartAction({ type: 'add_cart', item: cart.data.data.products[0].product });
    } catch (error) {
      userCtx.setAlertMessage(error.response.data.data.message);
    }
  };

  const getCartHandler = async () => {
    const cart = await getCart();
    dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
  };

  const updateCartHandler = async (product, quantity, val) => {
    const cart = await updateCart(product, quantity, val);
    dispatchCartAction({ type: 'get_cart', items: cart.data.data.products });
  };

  const deleteCartHandler = async (id) => {
    await deleteCart(id);
    dispatchCartAction({ type: 'delete_cart' });
  };

  const cartContext = {
    items: cartState.items,
    totalCost: cartState.totalCost,
    addCart: addCartHandler,
    getCart: getCartHandler,
    updateCart: updateCartHandler,
    deleteCart: deleteCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
