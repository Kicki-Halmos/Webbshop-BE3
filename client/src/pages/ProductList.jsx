/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productCtx.getProducts();
  }, []);

  return (
    <div>
      <input className="m-3" type="text" placeholder="Search here" onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="m-4 row">
        <div>
          {searchTerm === '' ? <div>Loading</div> : productList.filter((val) => val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.author.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((val) => (
              <div>
                <p>{val.title}</p>
              </div>
            ))}
        </div>
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
    </div>
  );
};

export default ProductList;
