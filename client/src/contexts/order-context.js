import React from 'react';

const OrderContext = React.createContext({
  orders: [],
  getOrders: () => {},
  getOneOrder: () => {},
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
});

export default OrderContext;
