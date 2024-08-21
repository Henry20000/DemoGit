import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
    return (
       <div style={{display: 'flex', flexDirection: 'column',padding: '0 120px', background: '#efefef', height: '1000px'}}>
         <h3>Home page</h3>
         <ProductDetailsComponent/>
       </div>
    )
}

export default ProductDetailsPage