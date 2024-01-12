import axios from "axios";
import { env } from "../config";

const token = localStorage.getItem("token");

const authOptions = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getCart = () => {
  const response = axios.get(`${env.base_url}/cart/get`, authOptions);
  return response;
};

export const addToCartItem = (id) => {
  console.log(authOptions);
  const response = axios.post(
    `${env.base_url}/cart/add/${id}`,
    {},
    authOptions
  );
  return response;
};

export const updateCart = (productId, quantity) => {
  // console.log(productId, quantity);
  const response = axios.put(
    `${env.base_url}/cart/edit/${productId}`,
    { quantity },
    authOptions
  );
  return response;
};

export const removeFromCart = (productId) => {
  // console.log(productId, quantity);
  const response = axios.delete(
    `${env.base_url}/cart/delete/${productId}`,
    authOptions
  );
  return response;
};

export const checkoutCart = () => {
  const response = axios.get(`${env.base_url}/orders/checkout`, authOptions);
  return response;
};
