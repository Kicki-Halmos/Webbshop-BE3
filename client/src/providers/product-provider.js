import React from "react";
import { useReducer } from "react";
import ProductContext from '../contexts/product-context';
import { productApis } from '../api/api';

const { getProducts } = productApis;

const defaultProductState = { products: [] };

const productReducer = (state,action) => {
    switch (action.type) {
        case 'get_products': return { products: action.products };
        case 'add_product': return { products: [...state,action.product] }
        case 'update_product': return {
            products: state.products.map((product) => {
                return product._id === action.product.id ? action.product : product
            })
        };
        case 'delete_product': return { products: state.products.filter((product) => product._id !== action.id) };
        default: return defaultProductState;
    }
}

const ProductProvider = (props) => {
    const [productState,dispatchProductAction] = useReducer(productReducer,defaultProductState);


    const getProductsHandler = async () => {
        try {
            const products = await getProducts();
            dispatchProductAction({ type: 'get_products',products: products })
        } catch (error) {
            console.log(error);
        }
    }

    const productContext= {
        products: productState.products,
        getProducts: getProductsHandler
    };

    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;




