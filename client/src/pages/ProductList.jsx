/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const productList = productCtx.products;
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    productCtx.getProducts();
  }, []);

  const renderProducts = (products) => {
    return (
      !products ? <div>Loading</div> : products.map((product) => (
        <div className="col" key={product._id}>
          <ProductItem
            id={product._id}
            title={product.title}
            price={product.price}
            img={product.img}
            author={product.author}
          />
        </div>
      ))
    );
  };

  const filterBySearchTerm = () => {
    return productList
      .filter((val) => (
        val.title.toLowerCase().includes(searchTerm.toLowerCase())
        || val.author.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const filterByGenre = () => {
    return productList
      .filter((val) => val.category.includes(genre));
  };

  const handleGenreChange = (e) => {
    e.preventDefault();
    setGenre(e.target.attributes[0].nodeValue);
    setSearchTerm('');
  };

  let products = productList;
  if (searchTerm) {
    products = filterBySearchTerm();
  } else if (genre) {
    products = filterByGenre();
  }

  return (
    <div>
      <input className="m-3" type="text" placeholder="Search here" onChange={(e) => setSearchTerm(e.target.value)} />
      <div>
        <a id="Deckare" className={genre === 'Deckare' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Deckare</a>
      </div>
      <div>
        <a id="Skönlitteratur" className={genre === 'Skönlitteratur' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Skönliteratur</a>
      </div>
      <div>
        <a id="Data & IT" className={genre === 'Data & IT' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Data & IT</a>
      </div>
      <div className="m-4 row">
        {renderProducts(products)}
      </div>
    </div>
  );
};

export default ProductList;
