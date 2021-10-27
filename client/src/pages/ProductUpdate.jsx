/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import ProductContext from '../contexts/product-context';
import ProductUpdateForm from '../components/ProductUpdateForm';

export default function ProductUpdate() {
  const productCtx = useContext(ProductContext);
  const { oneProduct } = productCtx;
  const history = useHistory();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    productCtx.adminGetOneProduct(id);
    const token = localStorage.getItem('adminToken');
    if (!token) {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      <AdminNav />
      {oneProduct
        && oneProduct.title && <ProductUpdateForm product={oneProduct} />}
    </div>
  );
}
