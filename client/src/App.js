import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail.js';
import ProductList from './pages/ProductList.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Cart from './pages/Cart.js';
import Orders from './pages/Orders.js';
import Account from './pages/Account.js';
import ProductProvider from './providers/product-provider';
import UserProvider from './providers/user-provider';
import Navbar from './components/Navbar';

function App() {

  return (
    <UserProvider>
    <ProductProvider>
      <Navbar/>

      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path='/products/:id'>
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
      </div>
    </ProductProvider>
    </UserProvider>
  );
}

export default App;
