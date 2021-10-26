/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import OrderContext from '../contexts/order-context';
import UserOrderItem from '../components/UserOrderItem';
import AdminNav from '../components/AdminNav';

const OrderDetail = () => {
  const orderCtx = useContext(OrderContext);
  const { oneOrder } = orderCtx;
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    orderCtx.getOneOrder(id);
  }, []);

  return (
    <div>
      <AdminNav />
      {oneOrder
      && oneOrder.status && (
        <UserOrderItem
          orderId={oneOrder._id}
          products={oneOrder.products}
          status={oneOrder.status}
          totalCost={oneOrder.totalCost}
          deliveryCost={oneOrder.deliveryCost}
          deliveryAddress={oneOrder.deliveryAddress}
          dateRegistered={oneOrder.createdAt}
        />
      )}
    </div>
  );
};

export default OrderDetail;
