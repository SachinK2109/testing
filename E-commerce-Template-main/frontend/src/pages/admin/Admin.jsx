import { Table, Grid, Flex, Typography, Divider, Button } from "antd";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityComponent from "../../components/quanity/QuantityComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { setAdminAuthentication } from "../../state/reducers/adminSlice";
import { getAdminOrders } from "../../services/orderService";
import { setAllOrder } from "../../state/reducers/orderSlice";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Admin = () => {
  const dispatch = useDispatch();
  const adminToken = localStorage.getItem("admin-token");

  const getAllOrders = async () => {
    const res = await getAdminOrders();
    if (res) {
      dispatch(setAllOrder(res.data.data));
    }
  };

  useEffect(() => {
    if (adminToken) {
      dispatch(setAdminAuthentication(adminToken));
      getAllOrders();
    }
  }, [adminToken]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Admin;
