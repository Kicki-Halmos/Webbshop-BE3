import React, { useContext, useState, useRef } from 'react';
import CartContext from '../contexts/cart-context';

const CartItem = ({
  img, title, quantity, id,
}) => {
  const [inputValue, setInputValue] = useState('');
  const refValue = useRef('');
  const cartCtx = useContext(CartContext);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    cartCtx.updateCart(id, refValue.current.value);
  };

  const removeProductHandler = () => {
    cartCtx.updateCart(id, refValue.current.value, 'remove');
  };
  return (
    <div className="row bg-light m-2">
      <img className="col img-fluid" style={{ maxWidth: '7rem' }} src={img} alt="book cover" />
      <div className="col">

        <p className="fw-bold">{title}</p>
        <input onChange={inputChangeHandler} type="number" ref={refValue} className="col-1 fw-bold rounded p-1 m-2" min="1" value={inputValue === '' ? quantity : inputValue} />
      </div>
      <button
        className="col-1 col-offset-11 btn btn-danger align-self-center p-2"
        type="button"
        onClick={removeProductHandler}
      >
        Remove

      </button>

    </div>
  );
};

export default CartItem;
