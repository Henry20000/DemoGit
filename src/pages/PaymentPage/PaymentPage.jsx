import { Form, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  WrapperLeft,
  WrapperRight,
  WrapperTotal,
  WrapperInfo,
  Lable,
  WrapperRadio,
} from "./style";
import ButtonComponent from "../../components/ButtonCompnent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import * as PaymentService from "../../services/PaymentService"
import { PayPalButton } from "react-paypal-button-v2";



const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const navigate = useNavigate()
  const [sdkReady, setsdkReady] = useState(false)

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
   const [stateUserDetails, setStateUserDetails] = useState({
     name: '',
     phone: '',
     address: '',
     city: ''
   })
  const [form] = Form.useForm();
  const dispatch = useDispatch()


    useEffect(() => {
      form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  },[isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0);
    return result
  },[order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0);
    if(Number(result)) {
      return result
    }
    return 0
  }, [order])

    const diliveryPriceMemo = useMemo(() => {
      if(priceMemo > 200000) {
        return 10000
      }else if(priceMemo === 0) {
        return 0
      }else {
        return 20000
      }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
      return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    },[priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleAddOrder = () => {
    if(user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      console.log("Payment method:", payment);
       mutationAddOrder.mutate({
         token: user?.access_token,
         orderItems: order?.orderItemsSelected,
         fullName: user?.name,
         address: user?.address,
         phone: user?.phone,
         city: user?.city,
         paymentMethod: payment,
         itemsPrice: priceMemo,
         shippingPrice: diliveryPriceMemo,
         totalPrice: totalPriceMemo,
         user: user?.id,
       }) 
    }
  }

        const mutationUpdate = useMutation({
          mutationFn: (data) => {
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(
              id,
              { ...rests },
              user?.access_token
            );
            return res;
          },
        });

           const mutationAddOrder = useMutation({
             mutationFn: (data) => {
               const { token, ...rests } = data;
               const res = OrderService.createOrder(
                 { ...rests },
                 user?.access_token
               );
               return res;
             },
           });

        const { isPending, data } = mutationUpdate
        const { data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError} = mutationAddOrder

                  useEffect(() => {
                    if (isSuccess && dataAdd?.status === "OK") {
                      const arrayOrdered = []
                      order?.orderItemsSelected?.forEach(element => {
                        arrayOrdered.push(element.product)
                      });
                      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
                      message.success("Order successful")
                      navigate('/orderSuccess', {
                        state: {
                          delivery,
                          payment,
                          orders: order?.orderItemsSelected,
                          totalPriceMemo: totalPriceMemo
                        }
                      })
                    } else if (isError) {
                      message.error();
                    }
                  }, [isSuccess, isError]);

  const handleCancelUpdate = () => {
       setStateUserDetails({
         name: "",
         email: "",
         phone: "",
         isAdmin: false,
       })
       form.resetFields()
       setIsOpenModalUpdateInfo(false)
  }

  const onSuccessPaypal = (details, data) => {
     mutationAddOrder.mutate({
       token: user?.access_token,
       orderItems: order?.orderItemsSelected,
       fullName: user?.name,
       address: user?.address,
       phone: user?.phone,
       city: user?.city,
       paymentMethod: payment,
       itemsPrice: priceMemo,
       shippingPrice: diliveryPriceMemo,
       totalPrice: totalPriceMemo,
       user: user?.id,
       isPaid: true,
       paidAt: details.update_time
     }); 
  }

  const handleUpdateInfoUser = () => {
    const {name, address, city, phone} = stateUserDetails
    if(name && address && city && phone) {
       mutationUpdate.mutate(
          {
            id: user?.id,
            token: user?.access_token,
            ...stateUserDetails,
          }, {
            onSuccess: () => {
              dispatch(updateUser({name, address, city, phone }))
              setIsOpenModalUpdateInfo(false)
            }
          }
        )
      }
    }
    
   const handleOnchangeDetails = (e) => {
     setStateUserDetails({
       ...stateUserDetails,
       [e.target.name]: e.target.value,
     });
   };

   const handleDilivery = (e) => {
    setDelivery(e.target.value)
   }

   const handlePayment = (e) => {
    setPayment(e.target.value)
   }

   const addPaypalScript = async () => {
    const { data }  = await PaymentService.getConfig()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true;
    script.onload = () => {
      setsdkReady(true)
    }
    document.body.appendChild(script)
    console.log('data', data);
   }

   useEffect(() => {
    if(!window.paypal) {
      addPaypalScript()
    }else {
      setsdkReady(true)
    }
   }, [])

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isLoading={isPendingAddOrder}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 style={{ padding: "10px 0" }}>Pay</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo style={{ width: "800px" }}>
                <div>
                  <Lable>Select delivery method</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>{" "}
                      Economical delivery
                    </Radio>
                    <Radio value="gojek">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        GO_JEK
                      </span>{" "}
                      Economical delivery
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ width: "800px" }}>
                <div>
                  <Lable>Choose payment method</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money"> Pay cash upon receipt</Radio>
                    <Radio value="paypal">Payment by paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div style={{ fontSize: "13px" }}>
                    <span>Address: </span>
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`${user?.address} ${user?.city}`}</span>
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Change
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>Subtotal</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>Discount</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceDiscountMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>Delivery fee</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(diliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span style={{ fontSize: "13px" }}>Total Price</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "13px" }}>
                      (VAT included if applicable)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === "paypal" && sdkReady ? (
                <div style={{ width: "320px" }}>
                    <PayPalButton
                      amount={(totalPriceMemo/25000).toFixed(2)}
                      onSuccess={onSuccessPaypal}
                      onError={() => {
                        alert("Error");
                      }}
                    />
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: "rgb(255, 57, 69)",
                    height: "48px",
                    width: "320px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  textButton={"Make an Order"}
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                ></ButtonComponent>
              )}
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          forceRender
          title="Update delivery information"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateInfoUser}
        >
          <Loading isLoading={isPending}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              //onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateUserDetails["name"]}
                  onChange={handleOnchangeDetails}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <InputComponent
                  value={stateUserDetails["city"]}
                  onChange={handleOnchangeDetails}
                  name="city"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnchangeDetails}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnchangeDetails}
                  name="address"
                />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default PaymentPage;