import React, {
  useEffect, useContext, Fragment, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../contexts/product-context';

const ProductDetail = () => {
  const productCtx = useContext(ProductContext);
  const product = productCtx.oneProduct;
  const [inputValue, setInputValue] = useState('1');

  const params = useParams();
  const { id } = params;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const saveToCart = () => {
    // funktion som ska komma från cart-context sen
  };

  useEffect(() => {
    productCtx.getOneProduct(id);
  }, []);

  return (
    <>
      {product
      && (
      <div className="row m-5">
        <div className="col-4 m-4">
          <img src={product.img} style={{ maxWidth: '20rem' }} alt="book cover" />

        </div>
        <div className="col m-4">
          <h1>{product.title}</h1>
          <p className="fs-5">
            Författare:
            {' '}
            {product.author}
          </p>
          <p className="fs-2 fw-bold text-danger">
            {product.price}
            {' '}
            kr
          </p>
          <div className="d-flex border-top border-bottom p-2 my-4">
            <p className="fw-bold fs-4 m-2 align-self-center">Välj antal</p>
            <input onChange={inputChangeHandler} type="number" className="col-1 fw-bold rounded p-1 m-2" min="1" value={inputValue} />
            <button onClick={saveToCart} type="button" className="btn btn-danger m-2 fw-bold fs-4 col-8">Lägg i varukorg</button>
          </div>
          <p className="m-2">{product.description}</p>
        </div>
      </div>
      )}
    </>
  );
};

export default ProductDetail;
