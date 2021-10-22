import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/user-context';

export default function Navbar() {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  const history = useHistory();
  console.log(user);

  function logoutUser() {
    console.log('clicked logout ');
    localStorage.removeItem('token');
    history.push('/login');
  }

  useEffect(() => {
    userCtx.getUser();
  }, []);

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
          {Object.keys(user).length !== 0 && (
            <ul className="navbar-nav ">
              <li className="nav-item" />
              <li className="nav-item">
                <a className="nav-link text-light" href="/orders">
                  my orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/cart">
                  cart
                </a>
              </li>
              <li className="nav-item">
                <li className="nav-link text-light" href="#">
                  {user.fullName}
                </li>
              </li>

              <li>
                <a href="/login" onClick={logoutUser} className="nav-link text-light">
                  Logout
                </a>
              </li>

            </ul>
          ) }
          {Object.keys(user).length === 0 && (

            <ul className="navbar-nav">
              <li className="nav-link text-light" href="#">
                Cart
              </li>
              <a className="nav-link text-light" href="/login">
                Login /
              </a>
              <span>
                <a className="nav-link text-light" href="/register">Register</a>
                {' '}
              </span>
            </ul>

          )}
        </div>
      </nav>
    </div>
  );
}
