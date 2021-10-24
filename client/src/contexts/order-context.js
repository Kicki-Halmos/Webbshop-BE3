import React from 'react';

const OrderContext = React.createContext({
  orders: [],
  oneOrder: {},
  getOrders: () => {},
  getOneOrder: () => {},
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
});

export default OrderContext;
