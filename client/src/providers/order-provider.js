/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useReducer } from 'react';
import OrderContext from '../contexts/order-context';
import { orderApis } from '../api/api';

const {
  addOrder, getOrders, updateOrder, getOneOrder, deleteOrder,
} = orderApis;

const defaultOrderstate = { orders: [], oneOrder: {} };
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'get_orders': return { orders: action.orders };
    case 'add_order': return { orders: [...state.orders, action.order] };
    case 'update_order': return { orders: state.orders.map((order) => (order._id === action.order._id ? action.order : order)) };
    case 'get_one_order': return { oneOrder: action.order };
    case 'delete_order': return { orders: state.orders.filter((order) => order._id !== action.id) };

    default: return defaultOrderstate;
  }
};

const OrderProvider = ({ children }) => {
  const [orderState, dispatchOrderActions] = useReducer(orderReducer, defaultOrderstate);

  const getOrderHandler = async () => {
    const orders = await getOrders();
    dispatchOrderActions({ type: 'get_orders', orders: orders.data.data.orders });
  };

  const addOrderHandler = async (products, totalCost) => {
    const order = await addOrder(products, totalCost, '50');
    dispatchOrderActions({ type: 'add_order', order: order.data.data.order });
  };

  const updateOrderHandler = async (id, status) => {
    const order = await updateOrder(id, status);
    dispatchOrderActions({ type: 'update_order', order: order.data.data.order });
  };

  const getOneOrderHandler = async (id) => {
    const order = await getOneOrder(id);
    dispatchOrderActions({ type: 'get_one_order', order: order.data.data.order });
  };

  const deleteOrderHandler = async (id) => {
    await deleteOrder(id);
    dispatchOrderActions({ type: 'delete_order', id });
  };

  const orderContext = {
    orders: orderState.orders,
    oneOrder: orderState.oneOrder,
    getOrders: getOrderHandler,
    getOneOrder: getOneOrderHandler,
    addOrder: addOrderHandler,
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
