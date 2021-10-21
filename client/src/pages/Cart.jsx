/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import CartContext from '../contexts/cart-context';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const { items, totalAmount } = cartCtx;

  // skriv en onchange function som uppdateras så fort summan uppdateras.

  useEffect(() => {
    cartCtx.getCart();
  }, []);

  items !== [] && console.log(items);
  totalAmount !== 0 && console.log(totalAmount);

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
        />

      ))}

    </div>
  );
};

export default Cart;
