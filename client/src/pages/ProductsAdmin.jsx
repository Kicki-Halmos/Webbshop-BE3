/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../contexts/user-context';
import AdminNav from '../components/AdminNav';
import ProductContext from '../contexts/product-context';

export default function Admin() {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;
  const userCtx = useContext(UserContext);
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    productCtx.adminGetProducts();
    userCtx.getUser();
    const token = localStorage.getItem('adminToken');
    if (!token) {
      history.push('/login');
    }
  }, [history, productCtx, userCtx]);

  const handleDelete = () => {
    productCtx.adminDeleteProduct(activeItem.id);
    history.push('/admin');
  };
  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {activeItem
              && (
              <p>
                {`Are you sure you want to delete
                ${activeItem.title}`}
              </p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleDelete} type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <AdminNav />
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
                <td>{product.title}</td>
                <td>{product.author}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => setActiveItem({ id: product._id, title: product.title })} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                  </button>
                </td>
                <td><button className="btn btn-primary" type="button"><Link to={`/admin/update-product/${product._id}`} style={{ textDecoration: 'none', color: 'white' }}>Edit</Link></button></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
