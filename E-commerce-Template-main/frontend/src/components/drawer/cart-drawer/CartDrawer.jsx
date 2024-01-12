import React, { useEffect } from "react";
import {
  Drawer,
  Collapse,
  theme,
  Card,
  Flex,
  Row,
  Col,
  Typography,
  Divider,
  Button,
} from "antd";
import "./CartDrawer.css";
import QuantityComponent from "../../quanity/QuantityComponent";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartItems,
  removeCartItem,
} from "../../../state/reducers/cartSlice";
import {
  checkoutCart,
  removeFromCart,
} from "../../../services/cartDataService";

const { Title, Text, Paragraph } = Typography;

const CartDrawer = ({ openDrawer, onClose }) => {
  const cart = useSelector((state) => state.cart.cart);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };
  const total = () => {
    return cart.reduce(
      (acc, item) => acc + item.productId.discount * item.quantity,
      0
    );
  };
  const clearCart = () => {
    dispatch(clearCartItems());
  };

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    dispatch(removeCartItem(productId));
  };

  const checkoutCartItems = async () => {
    if (isAuthenticated) {
      const res = await checkoutCart();
      // console.log(res);
      const sessionId = res.data.data.sessionId;
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      stripe.redirectToCheckout({ sessionId });
    } else {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   total();
  // }, [cart.length]);

  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={onClose}
      open={openDrawer}
      className="cart-drawer"
    >
      <Row gutter={[16, 16]} justify={"center"}>
        <Col>
          <Button size="large" onClick={handleViewCart}>
            View Cart
          </Button>
        </Col>
        <Col>
          <Button size="large" onClick={clearCart}>
            Clear Cart
          </Button>
        </Col>
        <Card>
          {cart.map((items) => (
            <Row key={items._id}>
              <Col span={12}>
                <img src={items.productId.imageUrl} alt="" width={120} />
              </Col>
              <Col span={12}>
                <Title level={5}>{items.productId.title}</Title>
                <Text type="secondary">Rs. {items.productId.discount}</Text>
                <Flex justify="space-between" align="center">
                  <QuantityComponent
                    productId={items.productId._id}
                    quantity={items.quantity}
                  />
                  <Button
                    style={{ padding: 4, margin: 10 }}
                    onClick={() => handleRemoveFromCart(items.productId._id)}
                  >
                    <IconTrash />
                  </Button>
                </Flex>
              </Col>
              <Divider />
            </Row>
          ))}
          {/* <Col span={12}>
              <img
                src="https://m.media-amazon.com/images/I/41AsllSnTCL._SX300_SY300_QL70_FMwebp_.jpg"
                alt=""
                width={120}
              />
            </Col>
            <Col span={12}>
              <Title level={5}>Pringles Sour Cream & Onion</Title>
              <Text type="secondary">Rs. 115</Text>
              <Flex justify="space-between" align="center">
                <QuantityComponent />
                <Button style={{ padding: 4, margin: 10 }}>
                  <IconTrash />
                </Button>
              </Flex>
            </Col>
            <Divider /> */}
          <Col>
            <Flex justify="space-between">
              <Text strong>Total</Text>
              <Text strong>Rs.{total()}</Text>
            </Flex>
          </Col>
        </Card>
        <Col>
          <Button size="large" onClick={checkoutCartItems}>
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default CartDrawer;
