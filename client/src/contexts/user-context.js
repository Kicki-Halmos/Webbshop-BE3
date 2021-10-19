import React from 'react';

const UserContext = React.createContext({
  user: {},
  getUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
});

export default UserContext;
