import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Account from './pages/Account';
import ProductProvider from './providers/product-provider'

function App() {
  return (
    <ProductProvider>

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
  );
}

export default App;
