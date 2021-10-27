import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/user-context';

export default function Navbar() {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  const history = useHistory();

  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    history.push('/login');
  }

  return (
    <div className="mb-4 ">
      <nav className="navbar navbar-expand-md navbar-light bg-primary px-3">
        <a className="navbar-brand " href="/">
          <h3 className="mb-0 "> Shop </h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          {user && user.fullName ? (
            <ul className="navbar-nav ">
              <li className="nav-item" />
              <li className="nav-item">
                <a className="nav-link text-light" href="/account">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/cart">
                  Cart
                </a>
              </li>
              {user && user.isAdmin === true
                && (
                <li className="nav-item">
                  <a className="nav-link text-light" href="/admin">Admin</a>
                </li>
                )}
              <li>
                <a href="/login" onClick={logoutUser} className="nav-link text-light">
                  Logout
                </a>
              </li>

            </ul>
          )
            : (

              <ul className="navbar-nav">
                <li>
                  <a className="nav-link text-light" href="/cart">
                    Cart
                  </a>
                </li>
                <li>
                  <a className="nav-link text-light" href="/login">
                    Login
                  </a>
                </li>
                <li>
                  <a className="nav-link text-light" href="/register">Register</a>
                  {' '}
                </li>

              </ul>

            )}
        </div>
      </nav>
    </div>
  );
}
