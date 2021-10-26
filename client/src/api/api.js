/* eslint-disable no-param-reassign */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const getProducts = () => api.get('/api/products');
const getProductItem = (id) => api.get(`/api/products/${id}`);

const updateUser = (id, fullName, email, phoneNumber, address) => api.put(`/api/user/${id}`, {
  id, fullName, email, phoneNumber, address,
});
const login = (email, password) => api.post('/api/user/login', { email, password });
const register = (fullName, email, password, phoneNumber, address) => api.post('/api/user/register', {
  fullName, email, password, phoneNumber, address,
});
const getUser = () => api.get('/api/user');
const getUserOrders = () => api.get('/api/user/orders');
const addUserOrder = (products, totalCost, deliveryCost) => api.post('/api/user/orders', { products, totalCost, deliveryCost });

const getCart = () => api.get('/api/cart');
const addNewCart = (product, quantity) => api.post('/api/cart', { product, quantity });
const updateCart = (product, quantity, val) => api.put('/api/cart', { product, quantity, val });
const deleteCart = () => api.delete('/api/cart');

const adminGetOrders = () => api.get('/api/admin/orders');
const adminGetOneOrder = (id) => api.get(`api/admin/orders/${id}`);
const adminUpdateOrder = (id, status) => api.post(`api/admin/orders/${id}`, { status });
const adminDeleteOrder = (id) => api.post(`api/admin/orders/${id}`);
const adminGetProducts = () => api.get('/api/admin/products');
const adminGetProductItem = (id) => api.get(`/api/admin/products/${id}`);
const adminCreateProductItem = (title, price, description, author, category, img) => api.post('/api/admin/products', {
  title, description, price, author, category, img,
});
const adminUpdateProductItem = (id, title, price, description, author, category, img) => api.put(`/api/admin/products/${id}`, {
  title, price, description, author, category, img,
});
const adminDeleteProductItem = (id) => api.delete(`/api/admin/products/${id}`);

export const productApis = {
  getProducts, getProductItem,
};
export const userApis = {
  login, register, getUser, updateUser, getUserOrders, addUserOrder,
};
export const cartApis = {
  getCart, addNewCart, updateCart, deleteCart,
};

export const adminApis = {
  adminGetOrders,
  adminGetOneOrder,
  adminUpdateOrder,
  adminDeleteOrder,
  adminGetProducts,
  adminGetProductItem,
  adminCreateProductItem,
  adminDeleteProductItem,
  adminUpdateProductItem,
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
