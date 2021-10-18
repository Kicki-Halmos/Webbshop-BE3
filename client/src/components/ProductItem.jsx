import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
  const {
    id, title, price, img, author,
  } = props;

  const saveToCart = () => {
    // funktion som ska komma från cart-context sen
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
