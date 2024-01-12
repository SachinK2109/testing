import React, { useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Typography,
  Flex,
  Grid,
  Divider,
} from "antd";
import { IconTrash } from "@tabler/icons-react";
import QuantityComponent from "../../components/quanity/QuantityComponent";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../state/reducers/cartSlice";
import { removeFromCart } from "../../services/cartDataService";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Cart = () => {
  const screens = useBreakpoint();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  // console.log(cart);
  // const [cart, setCartItems] = useState(cart);
  // const [cart, setCartItems] = useState([
  //   // Sample cart items
  //   {
  //     id: 1,
  //     image:
  //       "https://m.media-amazon.com/images/I/41AsllSnTCL._SX300_SY300_QL70_FMwebp_.jpg",
  //     title: "Pringles Sour cream & Onion",
  //     quantity: 1,
  //     price: 100,
  //     description: "This is good",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images-cdn.ubuy.co.in/63517777113a674a7d0bfce9-cheetos-flamin-hot-crunchy-cheese.jpg",
  //     title: "Cheetos flamin hot",
  //     quantity: 2,
  //     price: 200,
  //     description: "This is good",
  //   },
  //   // Add more items as needed
  // ]);

  // const handleQuantityChange = (id, value) => {
  //   const newCartItems = cart.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, quantity: value, subtotal: item.price * value };
  //     }
  //     return item;
  //   });
  //   // setCartItems(newCartItems);
  // };

  const handleRemove = async (productId) => {
    // const newCartItems = cart.filter((item) => item.id !== id);
    // setCartItems(newCartItems);
    console.log(productId);
    const res = await removeFromCart(productId);
    dispatch(removeCartItem(productId));
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
              src={record.productId.imageUrl}
              alt="Product"
              style={{ width: "100px" }}
            />
          ) : screens.sm || screens.xs ? (
            <Flex vertical justify="center" align="center">
              <img
                src={record.productId.imageUrl}
                alt="Product"
                style={{ width: "100px" }}
              />
              <Title level={5}>{record.title}</Title>
              <Divider />
              <QuantityComponent
                productId={record.productId._id}
                quantity={record.quantity}
              />
            </Flex>
          ) : (
            <img
              src={record.productId.imageUrl}
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
      render: (_, record) => record.productId.title,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <Flex justify="center">
          <QuantityComponent
            productId={record.productId._id}
            quantity={record.quantity}
          />
        </Flex>
      ),
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      //   responsive: ["md"],
      render: (_, record) => record.productId.price,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Subtotal",
      key: "subtotal",
      align: "center",
      render: (_, record) => record.productId.price * record.quantity,
      // responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button onClick={() => handleRemove(record.productId._id)}>
          <IconTrash />
        </Button>
      ),
      //   responsive: ["sm"],
    },
  ];

  const total = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "1rem" }}>
      <Table
        dataSource={cart}
        columns={columns}
        rowKey={(record) => record.productId._id}
        pagination={false}
      />
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <strong>Total: Rs. {total}</strong>
      </div>
    </div>
  );
};

export default Cart;
