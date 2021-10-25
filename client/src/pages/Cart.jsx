/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import CartContext from '../contexts/cart-context';
import OrderContext from '../contexts/order-context';
import UserContext from '../contexts/user-context';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const orderCtx = useContext(OrderContext);
  const userCtx = useContext(UserContext);
  const { items, totalCost } = cartCtx;
  const history = useHistory();

  const addOrderHandler = () => {
    orderCtx.addOrder(items, totalCost);
    userCtx.setAlertMessage('Your order was succesfully created!', 'success');
    cartCtx.deleteCart();
    history.push('/account');
  };

  useEffect(() => {
    cartCtx.getCart();
  }, []);

  return (
    <>
      {items[0] === undefined ? (
        <p className="fw-bold fs-3">
          Your cart is empty! Go ahead and
          {' '}
          <Link to="/products">buy some books!</Link>
        </p>
      )
        : (
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
        )}
    </>
  );
};

export default Cart;
