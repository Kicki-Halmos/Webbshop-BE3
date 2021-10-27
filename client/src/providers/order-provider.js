/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { useReducer } from 'react';
import OrderContext from '../contexts/order-context';
import { adminApis } from '../api/api';

const {
  adminGetOrders, adminUpdateOrder, adminGetOneOrder, adminDeleteOrder,
} = adminApis;

const defaultOrderstate = { orders: [], oneOrder: {} };
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'get_orders': return { orders: action.orders };
    case 'update_order': return { orders: state.orders.map((order) => (order._id === action.order._id ? action.order : order)) };
    case 'get_one_order': return { ...state, oneOrder: action.order };
    case 'delete_order': return { orders: state.orders.filter((order) => order._id !== action.id) };

    default: return defaultOrderstate;
  }
};

const OrderProvider = ({ children }) => {
  const [orderState, dispatchOrderAction] = useReducer(orderReducer, defaultOrderstate);

  const getOrderHandler = async () => {
    try {
      const orders = await adminGetOrders();
      dispatchOrderAction({ type: 'get_orders', orders: orders.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderHandler = async (id, status) => {
    try {
      const order = await adminUpdateOrder(id, status);
      dispatchOrderAction({ type: 'update_order', order: order.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const getOneOrderHandler = async (id) => {
    try {
      const order = await adminGetOneOrder(id);
      dispatchOrderAction({ type: 'get_one_order', order: order.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrderHandler = async (id) => {
    try {
      await adminDeleteOrder(id);
      dispatchOrderAction({ type: 'delete_order', id });
    } catch (error) {
      console.error(error);
    }
  };

  const orderContext = {
    orders: orderState.orders,
    oneOrder: orderState.oneOrder,
    getOrders: getOrderHandler,
    getOneOrder: getOneOrderHandler,
    updateOrder: updateOrderHandler,
    deleteOrder: deleteOrderHandler,

  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
