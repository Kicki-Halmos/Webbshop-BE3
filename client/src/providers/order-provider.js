/* eslint-disable react/jsx-filename-extension */
import React, { useReducer } from 'react';
import OrderContext from '../contexts/order-context';
import { orderApis } from '../api/api';

const { addOrder } = orderApis;

const defaultOrderstate = { orders: [] };
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'add_order': return [...state.orders, action.order];
    default: return defaultOrderstate;
  }
};

const OrderProvider = ({ children }) => {
  const [orderState, dispatchOrderActions] = useReducer(orderReducer, defaultOrderstate);

  const addOrderHandler = async (products, totalCost) => {
    const order = await addOrder(products, totalCost, '50');
    dispatchOrderActions({ type: 'add_order', order: order.data.data.order });
  };

  const orderContext = {
    orders: orderState.orders,
    addOrder: addOrderHandler,

  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
