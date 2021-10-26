/* eslint-disable no-underscore-dangle */
import React from 'react';

const UserOrderItem = (props) => {
  const {
    orderId, products, status, totalCost, deliveryCost, deliveryAddress, dateRegistered,
  } = props;

  return (
    <div className="card mt-4">
      <h5 className="card-header">
        OrderId:
        {' '}
        {orderId}
      </h5>
      {products.map((product) => (
        <ul key={product.product._id} className="list-group  pt-3 px-3">
          <li className="d-flex justify-content-between">
            {' '}
            <p>{product.product.title}</p>
            <p>
              Antal:
              {' '}
              {product.quantity}
            </p>

          </li>

        </ul>
      ))}
      <div className="">
        <p className="p-3 border-bottom">
          Leveransadress:
          {' '}
          {deliveryAddress}
        </p>
        <p className="ps-3 pt-3">
          Summa:
          {' '}
          {totalCost}
          kr
        </p>
        <p className="ps-3">
          Frakt:
          {' '}
          {deliveryCost}
          kr

        </p>
        <p className="fw-bold border-bottom ps-3 pb-3">
          Totalsumma:
          {' '}
          {totalCost + deliveryCost}
        </p>

        <p className="fw-bold p-3">
          Status på order:
          {' '}
          {status}
        </p>
        <p className="fw-bold p-3">
          Orderdatum:
          {' '}
          {dateRegistered && dateRegistered.slice(0, 10)}
        </p>
      </div>

    </div>
  );
};

export default UserOrderItem;
