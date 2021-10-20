import React from 'react';

const UserContext = React.createContext({
  user: {},
  errorMessage: '',
  getUser: () => {},
  updateUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
});

export default UserContext;
