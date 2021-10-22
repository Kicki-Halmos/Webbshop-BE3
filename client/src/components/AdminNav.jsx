import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin" style={{ textDecoration: 'none' }}>products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/orders" style={{ textDecoration: 'none' }}>orders</Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}
