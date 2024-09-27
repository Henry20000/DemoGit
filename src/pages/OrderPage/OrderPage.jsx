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
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from "../../redux/slides/orderSlide";


const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const [listChecked, setListChecked] = useState([])
  const dispatch = useDispatch()
  const onChange = (e) => {
    if(listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value)
        setListChecked(newListChecked)
    }else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  console.log("listChecked", listChecked);


  const handleChangeCount = (type, idProduct) => {
    if(type === 'increase') {
      dispatch(increaseAmount({idProduct}))
    }else {
      dispatch(decreaseAmount({idProduct}))
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}));
    
  };

  const handleOnchangeCheckAll = (e) => {
   if(e.target.checked) {
    const newListChecked = []
    order?.orderItems?.forEach((item) => {
      newListChecked.push(item?.product)
    })
    setListChecked(newListChecked)
   }else {
    setListChecked([])
   }
  }

  const handleRemoveAllOrder = () => {
    if(listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({listChecked}))
    }
  }

 

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ padding: '10px 0'}}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length} ></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
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
                <DeleteOutlined style={{ cursor: "pointer" }} onClick={handleRemoveAllOrder} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
             {order?.orderItems?.map((order) => {
               return (<WrapperItemOrder>
                 <div
                   style={{
                     width: "390px",
                     display: "flex",
                     alignItems: "center",
                     gap: 4,
                   }}
                 >
                   <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                   <img
                     src={order?.image}
                     style={{
                       width: "77px",
                       height: "79px",
                       objectFit: "cover",
                     }}
                   />
                   <div style={{ fontSize: "13px", width: 260, overflow: 'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}>{order?.name}</div>
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
                       {order?.price}
                     </span>
                   </span>
                   <WrapperCountOrder>
                     <button
                       style={{
                         border: "none",
                         background: "transparent",
                         cursor: "pointer",
                       }}
                       onClick={() => handleChangeCount("decrease", order?.product)}
                     >
                       <MinusOutlined
                         style={{ color: "#000", fontSize: "10px" }}
                       />
                     </button>
                     <WrapperInputNumber
                       defaultValue={order?.amount}
                       value={order?.amount}
                       size="small"
                     />
                     <button
                       style={{
                         border: "none",
                         background: "transparent",
                         cursor: "pointer",
                       }}
                       onClick={() => handleChangeCount("increase", order?.product)}
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
                   >
                     {order?.price * order?.amount}
                   </span>
                   <DeleteOutlined
                     style={{ cursor: "pointer", fontSize: "13px" }} onClick={() => handleDeleteOrder(order?.product)}
                   />
                 </div>
               </WrapperItemOrder>
               )
             })}
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
                  >0</span>
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
                  >0</span>
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
                  >0</span>
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
                  >0213</span>
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