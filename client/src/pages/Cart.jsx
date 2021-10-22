/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import CartContext from '../contexts/cart-context';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const { items, totalCost /* cartId */ } = cartCtx;

  const addOrderHandler = () => {
    // function som lägger till ordern
  };

  useEffect(() => {
    cartCtx.getCart();
  }, []);

  return (
    <div className="row m-4">
      {items !== [] && items.map((item) => (
        <CartItem
          className="col-12"
          key={item.product._id}
          id={item.product._id}
          img={item.product.img}
          title={item.product.title}
          quantity={item.quantity}
          price={item.product.price}
        />

      ))}
      <div className="p-2">
        <p className="">
          Summa:
          {' '}
          {totalCost}
          {' '}
          kr
        </p>
        <p className="">Frakt: 50kr</p>
        <p className="fw-bold">
          Totalsumma:
          {' '}
          {totalCost + 50}
        </p>
      </div>
      <button onClick={addOrderHandler} className="btn btn-danger p-2 fw-bold fs-4" type="button">Beställ</button>

    </div>
  );
};

export default Cart;
