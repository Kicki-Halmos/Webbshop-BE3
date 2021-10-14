import React, {useEffect, useContext} from "react";
import ProductContext from "../contexts/product-context";
const ProductList = ()=> {

const productCtx = useContext(ProductContext);
const productList = productCtx.products;

useEffect(()=>{
   productCtx.getProducts();
        
},[])

return (<div>
    {!productList ? <div>Loading</div> : productList.map(product=> {
        return <div key={product._id}>{product.title}</div>
    }) }
</div>)
}

export default ProductList;