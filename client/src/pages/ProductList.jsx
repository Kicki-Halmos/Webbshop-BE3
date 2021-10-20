/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;
  const [searchTerm, setSearchTerm] = useState('');

  showAllProducts(() => {
    return (
      productList.map((product) => (
        <div className="col" key={product._id}>
          <ProductItem
            id={product._id}
            title={product.title}
            price={product.price}
            img={product.img}
            author={product.author}
        </div>
      ))
    );
  });

  useEffect(() => {
    productCtx.getProducts();
  }, []);

  return (
    <div>
      <input className="m-3" type="text" placeholder="Search here" onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="m-4 row">
        <div>
          {searchTerm === '' ? showAllProducts() : productList
          .filter((val) => val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.author.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((val) => (
              <div className="col">
                <ProductItem
                  id={val._id}
                  title={val.title}
                  price={val.price}
                  img={val.img}
                  author={val.author}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
