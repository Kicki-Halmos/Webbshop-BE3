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
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>price</th>
            <th>category</th>
          </tr>
        </thead>
        {productList && (
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td><Link to={`/admin/update-product/${product._id}`}>{product.title}</Link></td>
                <td>{product.author}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
