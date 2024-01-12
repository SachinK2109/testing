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

const AdminProducts = () => {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  const handleRemove = async (productId) => {
    await removeAdminProduct(productId);
    dispatch(removeProduct({ productId }));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_, record) => (
        <>
          {screens.md || screens.lg ? (
            <img
              src={record.imageUrl}
              alt="Product"
              style={{ width: "100px" }}
            />
          ) : screens.sm || screens.xs ? (
            <Flex vertical justify="center" align="center">
              <img
                src={record.imageUrl}
                alt="Product"
                style={{ width: "100px" }}
              />
              <Title level={5}>{record.title}</Title>
              <Divider />
              <div className="">Quantity: {record.quantity}</div>
            </Flex>
          ) : (
            <img
              src={record.imageUrl}
              alt="Product"
              style={{ width: "100px" }}
            />
          )}
        </>
      ),
      align: "center",
      //   responsive: ["md"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      responsive: ["md"],
      render: (_, record) => record.title,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <Flex justify="center">
          {/* <QuantityComponent
            productId={record._id}
            quantity={record.quantity}
          /> */}
          <div>{record.quantity}</div>
        </Flex>
      ),
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      //   responsive: ["md"],
      render: (_, record) => record.price,
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
          <Button onClick={() => handleRemove(record._id)}>
            <IconTrash />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Button onClick={() => navigate("/admin/add")}>Add Product</Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
      />
    </div>
  );
};

export default AdminProducts;
