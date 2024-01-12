import axios from "axios";
import { env } from "../config";

const token = localStorage.getItem("admin-token");

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

export const loginAdmin = (data) => {
  const response = axios.post(`${env.base_url}/admins/login`, data, options);
  return response;
};

export const registerAdmin = (data) => {
  const response = axios.post(`${env.base_url}/admins/add`, data, authOptions);
  return response;
};
