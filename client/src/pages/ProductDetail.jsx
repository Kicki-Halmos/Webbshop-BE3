/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, useContext, useState, useRef,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProductContext from '../contexts/product-context';
import UserContext from '../contexts/user-context';
import ErrorMessage from '../components/ErrorMessage';
import CartContext from '../contexts/cart-context';

const ProductDetail = () => {
  const productCtx = useContext(ProductContext);
  const userCtx = useContext(UserContext);
  const product = productCtx.oneProduct;
  const [inputValue, setInputValue] = useState('1');
  const refValue = useRef(null);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const message = userCtx.errorMessage;

  const quantity = items.filter((item) => item.product._id === id);

  useEffect(() => {
    productCtx.getOneProduct(id);
    cartCtx.getCart();
  }, []);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const saveToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    cartCtx.updateCart(id, refValue.current.value, 'plus');
  };

  return (
    <>

      {message && message !== '' && <ErrorMessage message={message} />}
      {product
      && (
      <div className="row m-5">
        <div className="col-4 m-4">
          <img src={product.img} style={{ maxWidth: '20rem' }} alt="book cover" />

        </div>
        <div className="col m-4">
          <h1>{product.title}</h1>
          <p className="fs-5">
            Författare:
            {' '}
            {product.author}
          </p>
          <p className="fs-2 fw-bold text-danger">
            {product.price}
            {' '}
            kr
          </p>
          <div className="d-flex border-top border-bottom p-2 my-4">
            <p className="fw-bold fs-4 m-2 align-self-center">Välj antal</p>
            {quantity[0] ? (
              <input
                ref={refValue}
                onChange={inputChangeHandler}
                type="number"
                className="col-1 fw-bold rounded p-2 m-2"
                min="1"
                value={quantity[0].quantity}
              />
            )
              : (
                <input
                  ref={refValue}
                  onChange={inputChangeHandler}
                  type="number"
                  className="col-1 fw-bold rounded p-2 m-2"
                  min="1"
                  value={inputValue}
                />
              ) }

            <button onClick={saveToCart} type="button" className="btn btn-danger m-2 fw-bold fs-4 col-8">Lägg i varukorg</button>
          </div>
          <p className="m-2">{product.description}</p>
        </div>
      </div>
      )}
    </>
  );
};

export default ProductDetail;
