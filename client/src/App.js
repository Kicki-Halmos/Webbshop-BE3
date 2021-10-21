/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Switch, Route, Redirect, Router,
} from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Account from './pages/Account';
import ProductProvider from './providers/product-provider';
import UserProvider from './providers/user-provider';
import history from './utils/history';
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <Navbar />
        <div className="container">
          <Router history={history}>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/products" />
              </Route>
              <Route path="/products" exact>
                <ProductList />
              </Route>
              <Route path="/products/:id">
                <ProductDetail />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
            </Switch>
          </Router>
        </div>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
