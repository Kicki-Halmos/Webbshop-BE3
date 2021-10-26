/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, useContext, useState, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../contexts/order-context';
import AdminNav from '../components/AdminNav';

export default function OrdersAdmin() {
  const orderCtx = useContext(OrderContext);
  const { orders } = orderCtx;
  const [status, setStatus] = useState('');
  const [isInput, setIsInput] = useState(false);
  const refInput = useRef('');

  useEffect(() => {
    orderCtx.getOrders();
  }, []);

  const setInputHandler = () => {
    setIsInput(true);
  };
  const onChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const updateOrderHandler = (id) => {
    const refStatus = refInput.current.value;
    orderCtx.updateOrder(id, refStatus);
    setIsInput(false);
  };
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
          {orders.map((order) => (
            <>
              <tr key={order._id}>
                <td><Link to={`/admin/orders/${order._id}`}>{order._id}</Link></td>
                {isInput ? (
                  <td>
                    <input ref={refInput} onChange={onChangeHandler} value={status === '' ? order.status : status} />
                  </td>
                ) : (
                  <td>
                    {order.status}
                    {' '}
                  </td>
                )}
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>
                  <button onClick={setInputHandler} type="button" className="btn btn-secondary">Update</button>
                </td>
                <td>
                  <button type="button" onClick={() => updateOrderHandler(order._id)} className="btn btn-success">Save</button>
                </td>

              </tr>
            </>
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
}
