import { Table, Grid, Flex, Typography, Divider, Button } from "antd";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityComponent from "../../../components/quanity/QuantityComponent";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../../state/reducers/productSlice";
import { removeAdminProduct } from "../../../services/productDataService";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const AdminOrders = () => {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.allorders);
  const navigate = useNavigate();

  const ordersWithTotal = orders.map((order) => {
    const orderTotal = order.products.reduce((total, product) => {
      return total + product.productId.price * product.quantity;
    }, 0);
    return { ...order, total: orderTotal };
  });

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, record) => (
        <>
          <Text>
            {record.user.userId.firstName} {record.user.userId.lastName}
          </Text>
        </>
      ),
      align: "center",
      //   responsive: ["md"],
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      responsive: ["md"],
      render: (total) => <Text>{total}</Text>,
    },
    {
      title: "Ordered At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_, record) => {
        const date = new Date(record.createdAt);
        // Example format: '29 Dec 2023, 06:48 AM'
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      //   responsive: ["md"],
      render: (_, record) => record.status,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            onClick={() =>
              navigate(`/admin/edit/${record._id}`, { state: record })
            }
          >
            <IconPencil />
          </Button>
          <Button>
            <IconTrash />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={ordersWithTotal}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
      />
    </div>
  );
};

export default AdminOrders;
