import React, { useContext, useState, useRef } from 'react';
import CartContext from '../contexts/cart-context';

const CartItem = ({
  img, title, quantity, id, price,
}) => {
  const [inputValue, setInputValue] = useState('');
  const refValue = useRef('');
  const cartCtx = useContext(CartContext);

  const sum = price * quantity;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    cartCtx.updateCart(id, refValue.current.value);
  };

  const removeProductHandler = () => {
    cartCtx.getCart();
    const { items } = cartCtx;
    if (items && items[1]) {
      cartCtx.updateCart(id, refValue.current.value, 'remove');
    } else {
      cartCtx.deleteCart();
    }
  };
  return (
    <div className="row bg-light m-2">
      <img className="col img-fluid m-2" style={{ maxWidth: '7rem' }} src={img} alt="book cover" />
      <div className="col">
        <p className="fw-bold">{title}</p>
        <input onChange={inputChangeHandler} type="number" ref={refValue} className="col-1 fw-bold rounded p-1 m-2" min="1" value={inputValue === '' ? quantity : inputValue} />
        <p className="fw-bold m-2">
          {sum}
          {' '}
          kr
        </p>
      </div>
      <button
        className="col-1 col-offset-11 btn btn-danger align-self-center p-1"
        type="button"
        onClick={removeProductHandler}
      >
        Ta bort

      </button>

    </div>
  );
};

export default CartItem;
