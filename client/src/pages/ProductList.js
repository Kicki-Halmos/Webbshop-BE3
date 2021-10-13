import React, {useEffect, useContext, useState} from "react";
import ProductContext from "../contexts/product-context";
const ProductList = ()=> {

const productCtx = useContext(ProductContext);
const [productList, setProductList] = useState([]);

useEffect(()=>{
   const getProductList = async () => {
    const products = await productCtx.getProducts();
    setProductList(products.data.data);
    
   }

   getProductList();
    
},[])
return (<div>
    {!productList ? <div>Loading</div> : productList.map(product=> {
        return <div key={product._id}>{product.title}</div>
    }) }
</div>)
}

export default ProductList;