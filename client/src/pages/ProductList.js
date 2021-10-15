import React, {useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import ProductContext from "../contexts/product-context";
const ProductList = ()=> {

const productCtx = useContext(ProductContext);
const productList = productCtx.products;

useEffect(()=>{
   productCtx.getProducts();
        
},[])

return (<div>
    {!productList ? <div>Loading</div> : productList.map(product=> {
        return (
        <Link  key={product._id} to={`/products/${product._id}`}>
        <div >{product.title}</div>
        </Link>
        )
    }) }
</div>)
}

export default ProductList;