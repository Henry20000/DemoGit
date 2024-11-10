import React from "react";
import { StyleNameProduct, WrapperDiscountText, WrapperPriceText, WrapperReporText, CardHead, WrapperCardStyle, WrapperStyleTextSell } from "./style";
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";



const CardComponent = (props) => {
   const {countInStock, description, image, name, price, rating, type, discount, selled, id} = props
   const navigate = useNavigate()
   const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
   }
    return (
      <WrapperCardStyle
        hoverable
        styles={{ body: { padding: "10px" } }}
        style={{ width: 200 }}
        cover={
          <CardHead>
            <img alt="example" src={image} />
          </CardHead>
        }
        onClick={() => handleDetailsProduct(id)}
      >
        <img
          src={logo}
          style={{
            width: "68px",
            height: "14px",
            position: "absolute",
            top: -1,
            left: -1,
            borderTopLeftRadius: "3px",
          }}
        />
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReporText>
          <span style={{ marginRight: "4px" }}>
            <span> {rating} </span>{" "}
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
            />
          </span>
          <WrapperStyleTextSell>| Sold {selled || 1000}+ </WrapperStyleTextSell>
        </WrapperReporText>
        <WrapperPriceText>
          <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
          <WrapperDiscountText>
               - {discount || 15} %
          </WrapperDiscountText>
        </WrapperPriceText>
      </WrapperCardStyle>
    );
}

export default CardComponent