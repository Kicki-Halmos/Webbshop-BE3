import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const getProducts = () => api.get('/api/products');
const createProductItem = (title,description,price,brand,category,img) => api.post('/api/products',{ title,description,price,brand,category,img });
const updateProductItem = (id,title,description,price,brand,category,img) => api.put(`/api/products/${id}`,{ title,description,price,brand,category,img })
const getProductItem = (id) => api.get(`/api/products/${id}`);
const deleteProductItem = (id) => api.delete(`/api/products/${id}`);

export const productApis = { getProducts,createProductItem,updateProductItem,getProductItem,deleteProductItem };

export default api;