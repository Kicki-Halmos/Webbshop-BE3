/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useReducer, useContext } from 'react';
import ProductContext from '../contexts/product-context';
import { productApis, adminApis } from '../api/api';
import UserContext from '../contexts/user-context';
import history from '../utils/history';

const {
  getProducts, getProductItem,
} = productApis;

const {
  adminGetProducts, adminCreateProductItem, adminDeleteProductItem, adminGetProductItem, adminUpdateProductItem,
} = adminApis;

const defaultProductState = { products: [], oneProduct: {} };

const productReducer = (state, action) => {
  switch (action.type) {
    case 'get_products': return { products: action.products };
    case 'add_product': return { products: [...state.products, action.product] };
    case 'update_product': return {
      products: (state.products.map((product) => (product._id === action.product._id ? action.product : product))),
    };
    case 'get_one_product': return { ...state, oneProduct: action.product };
    case 'delete_product': return { products: state.products.filter((product) => product._id !== action.id) };
    default: return defaultProductState;
  }
};

const ProductProvider = ({ children }) => {
  const [productState, dispatchProductAction] = useReducer(productReducer, defaultProductState);
  const userCtx = useContext(UserContext);

  const getProductsHandler = async () => {
    try {
      const products = await getProducts();
      dispatchProductAction({ type: 'get_products', products: products.data.data });
    } catch (error) {
      userCtx.setAlertMessage(error.response.data.data.message);
    }
  };

  const getProductItemHandler = async (id) => {
    try {
      const product = await getProductItem(id);
      dispatchProductAction({ type: 'get_one_product', product: product.data.data });
    } catch (error) {
      userCtx.setAlertMessage(error.response.data.data.message);
    }
  };

  const adminGetProductsHandler = async () => {
    try {
      const products = await adminGetProducts();
      dispatchProductAction({ type: 'get_products', products: products.data.data });
    } catch (error) {
      userCtx.setAlertMessage(error.response.data.data.message);
    }
  };

  const adminGetProductItemHandler = async (id) => {
    try {
      const product = await adminGetProductItem(id);
      dispatchProductAction({ type: 'get_one_product', product: product.data.data });
    } catch (error) {
      userCtx.setAlertMessage(error.response.data.data.message);
    }
  };

  const adminAddProductHandler = async (title, price, description, author, category, img) => {
    const product = await adminCreateProductItem(title, Number(price), description, author, category, img);
    dispatchProductAction({ type: 'add_product', product: product.data.data });
    history.push('/admin');
  };

  const adminUpdateProductHandler = async (id, title, price, description, author, category, img) => {
    const product = await adminUpdateProductItem(id, title, price, description, author, category, img);
    dispatchProductAction({ type: 'update_product', product: product.data.data });
    history.push('/admin');
  };

  const adminDeleteProductItemHandler = async (id) => {
    await adminDeleteProductItem(id);
    dispatchProductAction({ type: 'delete_product', id });
  };

  const productContext = {
    products: productState.products,
    oneProduct: productState.oneProduct,
    getProducts: getProductsHandler,
    getOneProduct: getProductItemHandler,
    adminGetProducts: adminGetProductsHandler,
    adminGetOneProduct: adminGetProductItemHandler,
    adminAddProduct: adminAddProductHandler,
    adminUpdateProduct: adminUpdateProductHandler,
    adminDeleteProduct: adminDeleteProductItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
