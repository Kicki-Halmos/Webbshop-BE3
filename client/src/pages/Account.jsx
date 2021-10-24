/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import UserContext from '../contexts/user-context';
import UserOrderItem from '../components/UserOrderItem';

const Account = () => {
  const userCtx = useContext(UserContext);
  const { user, userOrders } = userCtx;
  const history = useHistory();

  useEffect(() => {
    userCtx.getUserOrders();
    userCtx.getUser();
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      {user && !user.fullName ? <div>Loading</div> : <EditUserForm user={user} /> }
      {userOrders !== [] && userOrders.map((order) => (
        <UserOrderItem
          key={order._id}
          orderId={order._id}
          products={order.products}
          status={order.status}
          totalCost={order.totalCost}
          deliveryCost={order.deliveryCost}
          deliveryAddress={order.deliveryAddress}
        />
      ))}
    </div>
  );
};

export default Account;
