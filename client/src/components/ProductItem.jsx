import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartContext from '../contexts/cart-context';

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const {
    id, title, price, img, author,
  } = props;
  const history = useHistory();

  const saveToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    if (cartCtx.items[0]) {
      cartCtx.updateCart(id, 1, 'plus');
    } else {
      cartCtx.addCart(id, 1);
    }
  };

  return (
    <div className="card my-2 border-0" style={{ width: '14rem' }}>
      <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
        <img src={img} className="card-img-top img-fluid" alt="img of book frontpage" />
        <div className="p-1">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
        </div>
      </Link>
      <button onClick={saveToCart} type="button" className="btn btn-danger mt-2">
        {price}
        {' '}
        kr
      </button>

    </div>
  );
};

export default ProductItem;
