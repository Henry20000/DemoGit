import React, { useEffect, useMemo, useState } from "react";
import {
  WrapperContainer,
  WrapperInfo,
  Lable,
  WrapperValue,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperItemOrderInfo,
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";




const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const {state} = location
  console.log('location', location);
    
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isLoading={false}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 style={{ padding: "10px 0", marginLeft: "180px" }}>
            Order placed successfully
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo style={{ width: "870px" }}>
                <div>
                  <Lable>Delivery Method</Lable>
                  <WrapperValue style={{ fontSize: "13px" }}>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {orderContant.delivery[state?.delivery]}
                    </span>{" "}
                    Economical Delivery
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ width: "870px" }}>
                <div>
                  <Lable>Payment method</Lable>
                  <WrapperValue style={{ fontSize: "13px" }}>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo style={{ width: "870px" }}>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "13px",
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Price: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Quantity: {order?.amount}
                          </span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemOrderInfo>
              <div>
                <span style={{ fontSize: "16px", color: "red" }}>
                  Total Price: {convertPrice(state?.totalPriceMemo)}
                </span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;