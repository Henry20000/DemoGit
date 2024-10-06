import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonCompnent/ButtonComponent";
import { WrapperContainer, WrapperListOrder, WrapperItemOrder, WrapperStatus, WrapperFooterItem, WrapperHeaderItem } from "./style"
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";


const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(
      state?.id,
      state?.token
    );
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: Boolean(state?.id && state?.token),
  });
  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

    const mutation = useMutation({
      mutationFn: (data) => {
        const { id, token, orderItems } = data;
        const res = OrderService.cancelOrder(id, token, orderItems);
        return res
      }
    })

  const handleCanceOrder = (order) => {
    mutation.mutate({ id : order._id, token: state?.token, orderItems: order?.orderItems }, {
      onSuccess: () => {
        queryOrder.refetch()
      }
    })
  }

  const {isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } else if (isErrorCancel) {
      message.error()
    }
  },[isErrorCancel, isSuccessCancel ])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem>
        <img
          src={order?.image}
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            border: "1px solid rgb(238, 238, 238)",
            padding: "2px",
          }}
        />
        <div
          style={{
            width: 260,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginLeft: "10px",
            fontSize: "13px",
          }}
        >
          {order?.name}
        </div>
        <span
          style={{
            fontSize: "13px",
            color: "#242424",
            marginLeft: "auto",
          }}
        >
          {convertPrice(order?.price)}
        </span>
      </WrapperHeaderItem>;
    })
  }


  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h4 style={{fontSize: '13px', paddingLeft: '145px'}}>Đơn hàng của tôi</h4>
          <WrapperListOrder>
             {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      Trạng thái
                    </span>
                    <div>
                      <span
                        style={{ color: "rgb(255, 66, 78)", fontSize: "13px" }}
                      >
                        Giao hàng:{" "}
                      </span>
                      <span style={{ fontSize: "13px" }}>{`${
                        order.isPaid ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}</span>
                    </div>
                    <div>
                      <span
                        style={{ color: "rgb(255, 66, 78)", fontSize: "13px" }}
                      >
                        Thanh toán:{" "}
                      </span>{" "}
                      <span style={{ fontSize: "13px" }}>{`${
                        order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                      }`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span
                        style={{ color: "rgb(255, 66, 78)", fontSize: "13px" }}
                      >
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid #9255FD",
                          borderRadius: "4px",
                        }}
                        textButton={"Hủy đơn hàng"}
                        styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                      />
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid #9255FD",
                          borderRadius: "4px",
                        }}
                        textButton={"Xem chi tiết"}
                        styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                      />
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
             })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;