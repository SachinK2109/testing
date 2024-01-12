import axios from "axios";
import { env } from "../config";

const token = localStorage.getItem("token");
const admin = localStorage.getItem("admin-token");

const options = {
  headers: {
    "Content-type": "application/json",
  },
};

const authOptions = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const adminAuthOptions = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const createOrder = (token) => {
  const response = axios.post(
    `${env.base_url}/orders/add`,
    { token },
    authOptions
  );
  return response;
};

export const getAdminOrders = () => {
  const response = axios.get(
    `${env.base_url}/orders/get_all`,
    adminAuthOptions
  );
  return response;
};

export const getOrders = () => {
  const response = axios.get(`${env.base_url}/orders/get`, authOptions);
  return response;
};
