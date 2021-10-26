import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminNav from '../components/AdminNav';

export default function OrdersAdmin() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      history.push('/admin');
    }
  }, []);

  return (
    <div>
      <AdminNav />
      <h1>list all orders</h1>
    </div>
  );
}
