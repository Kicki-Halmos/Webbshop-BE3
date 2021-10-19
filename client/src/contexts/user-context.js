import React from 'react';

const UserContext = React.createContext({
  user: {},
  getUser: () => {},
  updateUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
});

export default UserContext;
