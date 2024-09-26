import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
    return (
      <div style={{ height: '100vh', width: '100%', background: '#efefef' }}>
        <div style={{ width: '1270px', height: '100%', margin: '0 auto'}}>
          <h3 style={{ padding: '10px 0'}}><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate("/");}}>Home page</span> - Product detail</h3> <ProductDetailsComponent idProduct={id} />
        </div>
      </div>
    );
}

export default ProductDetailsPage