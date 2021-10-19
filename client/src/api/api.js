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

const updateUser = (token, id, fullName, email, phoneNumber, address) => api.put(`/api/users/${id}`, {id, fullName, email, phoneNumber, address}, {headers: {
    Authorization: `Bearer ${token}`,
},});
const login = (email, password) => api.post('/api/users/login', { email, password });
const register = (fullName, email, password, phoneNumber, address) => api.post('/api/users/register', {
  fullName, email, password, phoneNumber, address,
});
const getUser = () => api.get('/api/users');
  
export const productApis = { getProducts,createProductItem,updateProductItem,getProductItem,deleteProductItem };
export const userApis = { login, register, getUser, updateUser };

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(err) => Promise.reject(err));

export const productApis = {
  getProducts, createProductItem, updateProductItem, getProductItem, deleteProductItem,
};
export const userApis = { login, register, getUser };

export default api;
