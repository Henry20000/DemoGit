import { Checkbox } from "antd";
import React, { useState } from "react";
import {
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
  WrapperInfo,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import imag from '../../assets/images/test.webp';
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonCompnent/ButtonComponent";
import { WrapperPriceDiscount } from "./style";


const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
  };
  const handleChangeCount = () => {

  }

  const handleOnchangeCheckAll = (e) => {
   
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ padding: '10px 0'}}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "380px" }}>
                <Checkbox onChange={handleOnchangeCheckAll} />
                <span> Tất cả ({count} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div
                  style={{
                    width: "390px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Checkbox onChange={onChange} />
                  <img
                    src={imag} // Đảm bảo `imag` được định nghĩa hoặc nhập
                    style={{
                      width: "77px",
                      height: "79px",
                      objectFit: "cover",
                    }}
                    alt="product"
                  />
                  <div style={{ fontSize: "13px" }}>Tên sản phẩm</div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <span style={{ fontSize: "13px", color: "#242424" }}>
                      211
                    </span>
                    <WrapperPriceDiscount>230</WrapperPriceDiscount>
                  </span>
                  <WrapperCountOrder>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <MinusOutlined
                        style={{ color: "#000", fontSize: "10px" }}
                      />
                    </button>
                    <WrapperInputNumber onChange={onChange} defaultValue={1} />
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <PlusOutlined
                        style={{ color: "#000", fontSize: "10px" }}
                      />
                    </button>
                  </WrapperCountOrder>
                  <span
                    style={{
                      color: "rgb(255, 66, 78)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  ></span>
                  <DeleteOutlined
                    style={{ cursor: "pointer", fontSize: "13px" }}
                  />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  ></span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  ></span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  ></span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span style={{ fontSize: "13px" }}>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  ></span>
                  <span style={{ color: "#000", fontSize: "13px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;