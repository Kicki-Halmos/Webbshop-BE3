import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  console.log(parseJwt(token));
  // console.log(parseJwt(token).user);

  useEffect(() => {
    parseJwt(token)
    console.log("useEffect ran......");
  });
  return (
    <div className="mb-4 ">
      <nav className="navbar navbar-expand-md navbar-light bg-primary px-3">
        <a className="navbar-brand " href="/">
          <h3 className="mb-0 "> Shop </h3>{" "}
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
          {token ? (
            <ul className="navbar-nav ">
              <li className="nav-item"></li>
              <li className="nav-item">
                <li className="nav-link text-light" href="#">
                  my orders
                </li>
              </li>
              <li className="nav-item">
                <li className="nav-link text-light" href="#">
                  cart
                </li>
              </li>
              <li className="nav-item">
                <li className="nav-link text-light" href="#">
                  {`Account ${parseJwt(token).user.fullName}`}{" "}
                </li>
              </li>
              <li className="nav-link text-light" href="#">
                Logout
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-link text-light" href="#">
                Cart
              </li>
              <li className="nav-link text-light" href="#">
                Login / Register
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
