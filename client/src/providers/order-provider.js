/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
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
    const orders = await adminGetOrders();
    dispatchOrderAction({ type: 'get_orders', orders: orders.data.data });
  };

  const updateOrderHandler = async (id, status) => {
    const order = await adminUpdateOrder(id, status);
    dispatchOrderAction({ type: 'update_order', order: order.data.data });
  };

  const getOneOrderHandler = async (id) => {
    const order = await adminGetOneOrder(id);
    dispatchOrderAction({ type: 'get_one_order', order: order.data.data });
  };

  const deleteOrderHandler = async (id) => {
    await adminDeleteOrder(id);
    dispatchOrderAction({ type: 'delete_order', id });
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
