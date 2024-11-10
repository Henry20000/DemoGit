import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/order/get-all-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/order/get-details-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const cancelOrder = async (id, access_token, orderItems) => {
  const res = await axiosJWT.delete(
    `${import.meta.env.VITE_API_URL}/order/cancel-order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
      data: { data: orderItems },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/order/get-all-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
