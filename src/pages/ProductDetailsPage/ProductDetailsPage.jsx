import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 120px",
          background: "#efefef",
          height: "1000px",
        }}
      >
        <h3>
          <span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate("/");}}>Home page</span> - Product detail
        </h3>
        <ProductDetailsComponent idProduct={id} />
      </div>
    );
}

export default ProductDetailsPage