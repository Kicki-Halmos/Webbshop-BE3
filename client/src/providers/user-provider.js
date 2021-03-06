/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { useReducer } from 'react';
import UserContext from '../contexts/user-context';
import { userApis } from '../api/api';
import history from '../utils/history';

const {
  getUser, login, register, updateUser, getUserOrders, addUserOrder,
} = userApis;
const defaultUserState = { user: {}, alertMessage: {}, orders: [] };

const userReducer = (state, action) => {
  switch (action.type) {
    case 'get_me': return { ...state, user: action.user };
    case 'update_user': return { ...state, user: action.user };
    case 'update_alert_message': return { ...state, alertMessage: action.alertMessage };
    case 'get_user_orders': return { ...state, orders: action.orders };
    case 'add_order': return { ...state, orders: [...state.orders, action.order] };
    default: return defaultUserState;
  }
};

const UserProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUserState);

  const alertMessageHandler = (content, status) => {
    try {
      const message = { content, status };
      dispatchUserAction({ type: 'update_alert_message', alertMessage: message });
    } catch (error) {
      console.error(error);
    }
  };

  const getMeHandler = async () => {
    try {
      const user = await getUser();
      dispatchUserAction({ type: 'get_me', user: user.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const getUserOrdersHandler = async () => {
    try {
      const orders = await getUserOrders();
      dispatchUserAction({ type: 'get_user_orders', orders: orders.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const addUserOrderHandler = async (products, totalCost) => {
    try {
      const order = await addUserOrder(products, totalCost, '50');
      dispatchUserAction({ type: 'add_order', order: order.data.data });
    } catch (error) {
      console.error(error);
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
      if (token.data.adminToken) {
        localStorage.setItem('adminToken', token.data.adminToken);
      }
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
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
  };

  const userContext = {
    user: userState.user,
    userOrders: userState.orders,
    alertMessage: userState.alertMessage,
    getUser: getMeHandler,
    loginUser: loginHandler,
    registerUser: registerHandler,
    logoutUser: logoutHandler,
    updateUser: updateHandler,
    setAlertMessage: alertMessageHandler,
    getUserOrders: getUserOrdersHandler,
    addUserOrder: addUserOrderHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
