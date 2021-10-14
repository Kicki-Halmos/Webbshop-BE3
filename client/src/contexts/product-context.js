import React from 'react';

const ProductContext = React.createContext({
    products: [],
    getProducts: () => {},
});

export default ProductContext;