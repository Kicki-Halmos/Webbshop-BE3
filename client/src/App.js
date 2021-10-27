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
import Account from './pages/Account';
import ProductProvider from './providers/product-provider';
import UserProvider from './providers/user-provider';
import CartProvider from './providers/cart-provider';
import OrderProvider from './providers/order-provider';
import history from './utils/history';
import Navbar from './components/Navbar';
import ProductsAdmin from './pages/ProductsAdmin';
import ProductFormAdmin from './pages/ProductFormAdmin';
import ProductUpdate from './pages/ProductUpdate';
import OrdersAdmin from './pages/OrdersAdmin';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
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
                  <Route path="/account">
                    <Account />
                  </Route>
                  <Route exact path="/admin/orders">
                    <OrdersAdmin />
                  </Route>
                  <Route path="/admin/orders/:id">
                    <OrderDetail />
                  </Route>
                  <Route path="/admin/update-product/:id">
                    <ProductUpdate />
                  </Route>
                  <Route path="/admin/create-product">
                    <ProductFormAdmin />
                  </Route>
                  <Route path="/admin">
                    <ProductsAdmin />
                  </Route>
                </Switch>
              </Router>
            </div>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
