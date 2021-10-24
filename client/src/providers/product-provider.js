/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { useReducer, useContext } from 'react';
import ProductContext from '../contexts/product-context';
import { productApis } from '../api/api';
import UserContext from '../contexts/user-context';

const {
  getProducts, createProductItem, updateProductItem, getProductItem, deleteProductItem,
} = productApis;

const defaultProductState = { products: [], oneProduct: {} };

const productReducer = (state, action) => {
  switch (action.type) {
    case 'get_products': return { products: action.products };
    case 'add_product': return { products: [...state.products, action.product] };
    case 'update_product': return {
      products: (state.products.map((product) => (product._id === action.product._id ? action.product : product))),
    };
    case 'get_one_product': return { oneProduct: action.product };
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
      console.log(error);
    }
  };

  const addProductHandler = async () => {
    try {
      const product = await createProductItem();
      dispatchProductAction({ type: 'add_product', product: product.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductHandler = async (id) => {
    try {
      const product = await updateProductItem(id);
      dispatchProductAction({ type: 'update_product', product: product.data.data });
    } catch (error) {
      console.log(error);
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

  const deleteProductItemHandler = async (id) => {
    try {
      await deleteProductItem(id);
      dispatchProductAction({ type: 'delete_product', id });
    } catch (error) {
      console.log(error);
    }
  };

  const productContext = {
    products: productState.products,
    oneProduct: productState.oneProduct,
    getProducts: getProductsHandler,
    addProduct: addProductHandler,
    updateProduct: updateProductHandler,
    getOneProduct: getProductItemHandler,
    deleteProduct: deleteProductItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
