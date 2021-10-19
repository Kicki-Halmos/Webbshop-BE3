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
    // parseJwt(token)

    console.log("useEffect ran......");
  }, [token]);
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-primary px-3">
        <a className="navbar-brand" href="/">
          <h1> Shop </h1>{" "}
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
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {token ? (
              <li className="nav-item">
                <li className="nav-link" href="#">
                  {`welcome ${parseJwt(token).user.fullName}`}{" "}
                </li>
                
              </li>
              
            ) : (
              <li className="nav-item">
                <h1 className="nav-link" href="#">
                  Welcome{" "}
                </h1>

              </li>
              
            )}
            {token ? (
              <li className="nav-item">
                <li className="nav-link" href="#">
                 Logout
                </li>
              </li>
              
            ) : (
              <li className="nav-item">
                <li className="nav-link" href="#">
                 Login / Register
                </li>

              </li>
              
            )}
            {token ? (
              <li className="nav-item">
                <li className="nav-link" href="#">
                 my orders
                </li>
              </li>
              
            ) : (
              <li className="nav-item">
                <li className="nav-link" href="#">
                 cart
                </li>

              </li>
              
            )}
            <li className="nav-link" href="#">
                 cart
                </li>
         

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
