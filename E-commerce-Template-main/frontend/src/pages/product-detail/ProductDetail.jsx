import { IconShoppingCart } from "@tabler/icons-react";
import {
  Row,
  Col,
  Typography,
  Button,
  Flex,
  Image,
  Grid,
  Breadcrumb,
} from "antd";
import React from "react";
import QuantityComponent from "../../components/quanity/QuantityComponent";
import { breadcrumbsData } from "../shop/constant";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconTrash } from "@tabler/icons-react";
import { addToCart, removeCartItem } from "../../state/reducers/cartSlice";
import { addToCartItem, removeFromCart } from "../../services/cartDataService";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductDetail = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  const cart = useSelector((state) => state.cart.cart);
  const quantity = cart.find((item) => item.productId._id === state._id);
  const addItemToCart = async () => {
    const res = await addToCartItem(state._id);
    const data = state;
    // console.log(data);
    dispatch(addToCart({ data, quantity: 1 }));
  };
  const handleRemove = async () => {
    const res = await removeFromCart(state._id);
    console.log(res);
    dispatch(removeCartItem(state._id));
  };
  return (
    <>
      <Breadcrumb items={breadcrumbsData} />
      <Row justify="center" align="top" style={{ padding: "1rem 0" }}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
        >
          <Row justify="center" align="middle">
            <Col>
              <Image src={state.imageUrl} alt="pringle" width={500} />
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
        >
          <Row justify={screens.md || screens.lg ? "start" : "center"}>
            <Col span={20}>
              <Paragraph>
                <Title>{state.title}</Title>
                <Text
                  type="secondary"
                  style={{ fontSize: 18, margin: "0 1rem 0 0 " }}
                  strong
                  delete
                >
                  Rs. {state.price}
                </Text>
                <Text style={{ fontSize: 32, color: "#fd5e01" }} strong>
                  Rs. {state.discount}
                </Text>
              </Paragraph>
              <Text type="secondary">
                Tax included. Shipping calculated at checkout.
              </Text>
              <Flex gap={20}>
                {quantity?.quantity && (
                  <>
                    <QuantityComponent
                      productId={state._id}
                      quantity={quantity?.quantity}
                    />
                    <Button onClick={() => handleRemove(state._id)}>
                      <IconTrash />
                    </Button>
                  </>
                )}
                {!quantity?.quantity && (
                  <Button
                    style={{
                      width: 350,
                      padding: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => addItemToCart()}
                  >
                    <IconShoppingCart /> Add To Cart
                  </Button>
                )}
              </Flex>
              <Paragraph>
                <Title level={4}>Description</Title>
                <Paragraph type="secondary">{state.description}</Paragraph>
              </Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
