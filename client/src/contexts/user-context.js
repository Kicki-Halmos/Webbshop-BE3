import React from 'react';

const UserContext = React.createContext({
  user: {},
  alertMessage: '',
  userOrders: [],
  getUser: () => {},
  updateUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
  setAlertMessage: () => {},
  getUserOrders: () => {},
  addUserOrder: () => {},
});

export default UserContext;
