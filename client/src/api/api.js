import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
});


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = { 'Bearer ': token }
    }
    return config;
},
(err) => {
    return Promise.reject(err);
  }
);



const getProducts = () => api.get('/api/products');
const createProductItem = (title,description,price,brand,category,img) => api.post('/api/products',{ title,description,price,brand,category,img });
const updateProductItem = (id,title,description,price,brand,category,img) => api.put(`/api/products/${id}`,{ title,description,price,brand,category,img })
const getProductItem = (id) => api.get(`/api/products/${id}`);
const deleteProductItem = (id) => api.delete(`/api/products/${id}`);

const login = (email, password) => api.post('/api/users/login', {email, password});
const register = (fullName, email, password, phoneNumber, address) => api.post('/api/users/register', {fullName, email, password, phoneNumber, address });
const getUser = (token) => api.get('/api/users', {headers: {
    Authorization: `Bearer ${token}`,
  },});

export const productApis = { getProducts,createProductItem,updateProductItem,getProductItem,deleteProductItem };
export const userApis = { login, register, getUser };


export default api;