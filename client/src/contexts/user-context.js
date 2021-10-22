import React from 'react';

const UserContext = React.createContext({
  user: {},
  alertMessage: '',
  getUser: () => {},
  updateUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
  setAlertMessage: () => {},
});

export default UserContext;
