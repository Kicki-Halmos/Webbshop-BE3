/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';
import CartContext from '../contexts/cart-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const productList = productCtx.products;
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    productCtx.getProducts();
    cartCtx.getCart();
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

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setGenre('');
  };

  let products = productList;
  if (searchTerm) {
    products = filterBySearchTerm();
  } else if (genre) {
    products = filterByGenre();
  }

  // const genres = [{name: 'Deckare', img: 'img/book.png'}, 'Skönlitteratur', 'Data & IT'];
  const genres = ['Deckare', 'Skönlitteratur', 'Data & IT', 'Samhälle & politik', 'Djur & natur', 'Mat & dryck', 'Ekonomi & ledarskap', 'Biografier', 'Resor', 'Kultur', 'Medicin'];

  return (
    <div>
      <input
        className="m-3"
        type="text"
        placeholder="Search here"
        onChange={(event) => handleSearchTerm(event)}
        value={searchTerm}
      />
      <div className="container">
        <div className="row row-cols-6">
          {genres.map((item) => (
            <div className="col mb-4">
              <img src="img/book.png" alt="Book" className="icon rounded d-block" />
              <a id={item} className={`${genre === item ? 'active' : ''}`} href="/" onClick={(event) => handleGenreChange(event)}>{item}</a>
            </div>

          ))}
        </div>
      </div>
      <div className="m-4 row">
        {renderProducts(products)}
      </div>
    </div>
  );
};

export default ProductList;
