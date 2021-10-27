import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../contexts/order-context';

const OrderTable = ({ id, status, createdAt }) => {
  const orderCtx = useContext(OrderContext);
  const [inputStatus, setInputStatus] = useState('');
  const [isInput, setIsInput] = useState(false);
  const refInput = useRef('');
  const setInputHandler = () => {
    setIsInput(true);
  };
  const onChangeHandler = (event) => {
    setInputStatus(event.target.value);
  };

  const updateOrderHandler = () => {
    const refStatus = refInput.current.value;
    orderCtx.updateOrder(id, refStatus);
    setIsInput(false);
  };

  return (
    <tr key={id}>
      <td><Link to={`/admin/orders/${id}`}>{id}</Link></td>
      {isInput ? (
        <td>
          <input ref={refInput} onChange={onChangeHandler} value={inputStatus === '' ? status : inputStatus} />
        </td>
      ) : (
        <td>
          {status}
          {' '}
        </td>
      )}
      <td>{createdAt.slice(0, 10)}</td>
      <td>
        <button onClick={setInputHandler} type="button" className="btn btn-secondary">Update</button>
      </td>
      <td>
        <button type="button" onClick={updateOrderHandler} className="btn btn-success">Save</button>
      </td>
    </tr>
  );
};

export default OrderTable;
