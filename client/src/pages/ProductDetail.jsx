import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../contexts/product-context';

const ProductDetail = () => {
  const productCtx = useContext(ProductContext);
  const product = productCtx.oneProduct;
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    productCtx.getOneProduct(id);
  }, []);

  return <div>{product && product.title}</div>;
};

export default ProductDetail;
