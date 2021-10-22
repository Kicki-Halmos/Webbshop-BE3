/* eslint-disable no-param-reassign */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const getProducts = () => api.get('/api/products');
const createProductItem = (title, description, price, brand, category, img) => api.post('/api/products', {
  title, description, price, brand, category, img,
});
const updateProductItem = (id, title, description, price, brand, category, img) => api.put(`/api/products/${id}`, {
  title, description, price, brand, category, img,
});
const getProductItem = (id) => api.get(`/api/products/${id}`);
const deleteProductItem = (id) => api.delete(`/api/products/${id}`);

const updateUser = (token, id, fullName, email, phoneNumber, address) => api.put(`/api/users/${id}`, {
  id, fullName, email, phoneNumber, address,
});
const login = (email, password) => api.post('/api/users/login', { email, password });
const register = (fullName, email, password, phoneNumber, address) => api.post('/api/users/register', {
  fullName, email, password, phoneNumber, address,
});
const getUser = () => api.get('/api/users');

const getCart = () => api.get('/api/carts');
const addNewCart = (product, quantity) => api.post('/api/carts', { product, quantity });
const updateCart = (product, quantity, val) => api.put('/api/carts', { product, quantity, val });
const deleteCart = () => api.delete('/api/carts');

const getOrders = () => api.get('/api/orders');
const getOneOrder = (id) => api.get(`api/orders/${id}`);
const addOrder = (products, totalCost, deliveryCost) => api.post('/api/orders', { products, totalCost, deliveryCost });
const updateOrder = (id) => api.post(`api/orders/${id}`);
const deleteOrder = (id) => api.post(`api/orders/${id}`);

export const productApis = {
  getProducts, createProductItem, updateProductItem, getProductItem, deleteProductItem,
};
export const userApis = {
  login, register, getUser, updateUser,
};
export const cartApis = {
  getCart, addNewCart, updateCart, deleteCart,
};

export const orderApis = {
  getOrders, getOneOrder, addOrder, updateOrder, deleteOrder,
};

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  const token = localStorage.getItem('token');
  if (adminToken) {
    config.headers = { 'X-Auth-Token': adminToken };
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(err) => Promise.reject(err));

export default api;
