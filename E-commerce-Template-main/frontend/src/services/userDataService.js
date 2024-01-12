import axios from "axios";
import { env } from "../config";

const token = localStorage.getItem("token");

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

export const loginUser = (data) => {
  console.log(env.base_url);
  const response = axios.post(`${env.base_url}/users/login`, data, options);
  return response;
};

export const registerUser = (data) => {
  const response = axios.post(`${env.base_url}/users/add`, data, options);
  return response;
};

export const getProfile = () => {
  const response = axios.get(`${env.base_url}/users/profile`, authOptions);
  return response;
};

export const updateProfile = (data) => {
  const response = axios.put(
    `${env.base_url}/users/profile/edit`,
    data,
    authOptions
  );
  return response;
};

export const getOrder = () => {
  const response = axios.get(`${env.base_url}/orders/get`, authOptions);
  return response;
};
