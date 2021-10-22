import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../components/AdminNav';

export default function Admin() {
  return (
    <div>
      <AdminNav />
      <h1>List all products</h1>
      <Link to="/admin/create-product" style={{ textDecoration: 'none' }}>Create new product</Link>
    </div>
  );
}
