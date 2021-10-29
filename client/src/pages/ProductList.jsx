/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext, useState } from 'react';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/product-context';
import CartContext from '../contexts/cart-context';
import UserContext from '../contexts/user-context';

const ProductList = () => {
  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  const productList = productCtx.products;
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    userCtx.getUser();
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

  const genres = [
    { name: 'Deckare', img: 'img/detective.png' },
    { name: 'Skönlitteratur', img: 'img/book-2.png' },
    { name: 'Data & IT', img: 'img/it-icon.png' },
    { name: 'Samhälle & politik', img: 'img/people.png' },
    { name: 'Djur & natur', img: 'img/nature.png' },
    { name: 'Mat & dryck', img: 'img/food.png' },
    { name: 'Ekonomi & ledarskap', img: 'img/economy.png' },
    { name: 'Biografier', img: 'img/bio_person1.png' },
    { name: 'Resor', img: 'img/travel.png' },
    { name: 'Kultur', img: 'img/book.png' },
    { name: 'Medicin', img: 'img/1.png' },
  ];

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
        <div className="row row-cols-3 row-cols-sm-4 row-cols-md-6">
          {genres.map((item) => (
            <div
              key={item.name}
              className="col mb-4"
            >
              <img src={item.img} alt="Category" className="icon rounded d-block mt-3" />
              <a id={item.name} className={`${genre === item.name ? 'active' : ''}`} href="/" onClick={(event) => handleGenreChange(event)}>{item.name}</a>
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
