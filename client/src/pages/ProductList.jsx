/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;

  useEffect(() => {
    productCtx.getProducts();
  }, []);

  return (
    <div className="m-4 row">
      {!productList ? <div>Loading</div> : productList.map((product) => (
        <div className="col">
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            img={product.img}
            author={product.author}
          />
        </div>
      )) }
    </div>
  );
};

export default ProductList;
