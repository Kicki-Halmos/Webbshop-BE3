import React from 'react';

const OrderContext = React.createContext({
  items: [],
  deliveryCost: 50,
  totalCost: 0,
  getOrders: () => {},
  getOneOrder: () => {},
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
});

export default OrderContext;
