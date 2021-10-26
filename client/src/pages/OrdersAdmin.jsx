/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import OrderContext from '../contexts/order-context';
import AdminNav from '../components/AdminNav';
import OrderTable from '../components/OrderTable';

export default function OrdersAdmin() {
  const orderCtx = useContext(OrderContext);
  const { orders } = orderCtx;

  const history = useHistory();

  useEffect(() => {
    orderCtx.getOrders();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      history.push('/admin');
    }
  }, []);

  return (
    <div>
      <AdminNav />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Status</th>
            <th>Date registered</th>
          </tr>
        </thead>
        {orders[0] && orders !== [] && (
        <tbody>
          {orders.sort((a, b) => new Date(a.createdAt.slice(0, 10)) - new Date(b.createdAt.slice(0, 10))).map((order) => (
            <OrderTable
              id={order._id}
              status={order.status}
              createdAt={order.createdAt}
            />
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
}
