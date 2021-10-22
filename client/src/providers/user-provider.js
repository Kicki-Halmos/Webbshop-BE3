/* eslint-disable react/jsx-filename-extension */
import React, { useReducer } from 'react';
import UserContext from '../contexts/user-context';
import { userApis } from '../api/api';
import history from '../utils/history';

const {
  getUser, login, register, updateUser,
} = userApis;
const defaultUserState = { user: {}, alertMessage: {} };

const userReducer = (state, action) => {
  switch (action.type) {
    case 'get_me': return { user: action.user };
    case 'update_user': return { ...state, user: action.user };
    case 'update_alert_message': return { ...state, alertMessage: action.alertMessage };
    default: return defaultUserState;
  }
};

const UserProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUserState);

  const alertMessageHandler = (content, status) => {
    const message = { content, status };
    dispatchUserAction({ type: 'update_alert_message', alertMessage: message });
  };

  const getMeHandler = async () => {
    try {
      const user = await getUser();
      dispatchUserAction({ type: 'get_me', user: user.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id, fullName, email, phoneNumber, address) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedUser = await updateUser(token, id, fullName, email, phoneNumber, address);
        alertMessageHandler(updatedUser.data.message, updatedUser.data.status);
        dispatchUserAction({ type: 'update_user', user: updatedUser.data.data });
      }
    } catch (err) {
      alertMessageHandler(err.response.data.data.message);
    }
  };

  const loginHandler = async (email, password) => {
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token.data.token);
    } catch (err) {
      alertMessageHandler(err.response.data.data.message);
    }
  };

  const registerHandler = async (fullName, email, password, phoneNumber, address) => {
    try {
      await register(fullName, email, password, phoneNumber, address);
      history.push('/login');
    } catch (err) {
      alertMessageHandler(err.response.data.data.message);
    }
  };

  const logoutHandler = () => {
    try {
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  };

  const userContext = {
    user: userState.user,
    alertMessage: userState.alertMessage,
    getUser: getMeHandler,
    loginUser: loginHandler,
    registerUser: registerHandler,
    logoutUser: logoutHandler,
    updateUser: updateHandler,
    setAlertMessage: alertMessageHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
