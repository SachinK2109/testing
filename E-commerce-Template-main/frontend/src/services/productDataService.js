import axios from "axios";
import { env } from "../config";

const token = localStorage.getItem("token");
const adminToken = localStorage.getItem("admin-token");

const authOptions = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const adminAuthOptions = {
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
};

export const getAllProducts = () => {
  const response = axios.get(`${env.base_url}/products/get`);
  return response;
};

export const getNewProducts = () => {
  const response = axios.get(`${env.base_url}/products/get/new`);
  return response;
};

export const getFeaturedProducts = () => {
  const response = axios.get(`${env.base_url}/products/get/featured`);
  return response;
};

export const getTodaysDealProducts = () => {
  const response = axios.get(`${env.base_url}/products/get/discount`);
  return response;
};

export const getSingleProduct = (id) => {
  const response = axios.get(`${env.base_url}/products/get/${id}`);
  return response;
};

export const addAdminProduct = (data) => {
  const response = axios.post(
    `${env.base_url}/products/add`,
    data,
    adminAuthOptions
  );
  return response;
};

export const updateAdminProduct = async (id, data) => {
  const response = await axios.put(
    `${env.base_url}/products/edit/${id}`,
    data,
    adminAuthOptions
  );
  return response;
};

export const removeAdminProduct = (id) => {
  const response = axios.delete(
    `${env.base_url}/products/delete/${id}`,
    adminAuthOptions
  );
  return response;
};
