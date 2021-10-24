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
      <div>
        <a id="Samhälle & politik" className={genre === 'Samhälle & politik' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Samhälle & politik</a>
      </div>
      <div>
        <a id="Djur & natur" className={genre === 'Djur & natur' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Djur & natur</a>
      </div>
      <div>
        <a id="Mat & dryck" className={genre === 'Mat & dryck' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Mat & dryck</a>
      </div>
      <div>
        <a id="Ekonomi & ledarskap" className={genre === 'Ekonomi & ledarskap' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Ekonomi & ledarskap</a>
      </div>
      <div>
        <a id="Biografier" className={genre === 'Biografier' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Biografier</a>
      </div>
      <div>
        <a id="Resor" className={genre === 'Resor' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Resor</a>
      </div>
      <div>
        <a id="Kultur" className={genre === 'Kultur' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Kultur</a>
      </div>
      <div>
        <a id="Medicin" className={genre === 'Medicin' ? 'active' : ''} href="/" onClick={(event) => handleGenreChange(event)}>Medicin</a>
      </div>
      <div className="m-4 row">
        {renderProducts(products)}
      </div>
    </div>
  );
};

export default ProductList;
