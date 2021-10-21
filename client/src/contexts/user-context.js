import React from 'react';

const UserContext = React.createContext({
  user: {},
  errorMessage: '',
  getUser: () => {},
  updateUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
  setErrorMessage: () => {},
});

export default UserContext;
