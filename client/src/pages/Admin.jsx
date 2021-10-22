import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div>
      <h1>Admin page</h1>
      <Link to="/createproduct" style={{ textDecoration: 'none' }}>Create new product</Link>
    </div>
  );
}