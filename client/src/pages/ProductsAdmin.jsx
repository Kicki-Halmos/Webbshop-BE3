/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import ProductContext from '../contexts/product-context';

export default function Admin() {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;

  useEffect(() => {
    productCtx.getProducts();
  }, []);

  return (
    <div>
      <AdminNav />
      <h1>List all products</h1>
      <Link to="/admin/create-product" style={{ textDecoration: 'none' }}>Create new product</Link>
      {productList && (
        productList.map((product) => (
          <div className="col" key={product._id}>
            <li>
              {product.title}
            </li>
          </div>
        ))
      )}
    </div>
  );
}
