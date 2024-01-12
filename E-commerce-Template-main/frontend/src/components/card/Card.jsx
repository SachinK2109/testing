import React from "react";
import { Card as Cards, Image, Typography, Flex, Button, Grid } from "antd";
import { IconEye } from "@tabler/icons-react";
import "./Card.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartItemExist } from "../../state/reducers/cartSlice";
import { isProductInCart } from "../../state/reducers/cartSlice";
import { addToCartItem } from "../../services/cartDataService";
const { Meta } = Cards;
const { Title, Text, Paragraph } = Typography;

const { useBreakpoint } = Grid;

const Card = ({ bordered, hoverable, actions, data, layout }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const productInCart = useSelector((state) =>
    isProductInCart(state, data._id)
  );

  // console.log("carty", cart);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(`/product/${data._id}`, { state: data });
  };

  const handleAddToCart = async () => {
    const res = await addToCartItem(data._id);
    dispatch(addToCart({ data, quantity: 1 }));
  };

  return layout === "single" ? (
    <Cards
      bordered={bordered}
      hoverable={hoverable}
      width={"min-content"}
      height={"min-content"}
    >
      <Flex wrap="wrap" justify="center" align="center">
        <div className="img-container">
          <img alt="example" src={data.imageUrl} className="img-fluid" />
        </div>
        <Flex align="start" justify="space-between" flex={1} wrap="wrap">
          <Flex vertical>
            <Text>{data.company}</Text>
            <Title level={3}>{data.title}</Title>
            <Paragraph>{data.description}</Paragraph>
          </Flex>
          <Flex vertical>
            <Text strong style={{ fontSize: 18 }}>
              Rs. {data.price}
            </Text>
            <Button
              style={{ margin: "20px 0 12px 0" }}
              onClick={handleAddToCart}
              disabled={productInCart}
            >
              {!productInCart ? "Add to Cart" : "In Cart"}
            </Button>
            <IconEye />
          </Flex>
        </Flex>
      </Flex>
    </Cards>
  ) : (
    <Cards
      bordered={bordered}
      hoverable={hoverable}
      width={"max-content"}
      height={"max-content"}
      cover={
        data.imageUrl ? (
          <>
            <div className="img-container">
              <img alt="example" src={data.imageUrl} className="img-fluid" />
            </div>
          </>
        ) : (
          data.icon
        )
      }
      onClick={handleClick}
    >
      {!data.imageUrl ? (
        <Meta
          title={<div style={{ textAlign: "center" }}>{data.title}</div>}
          description={
            <div style={{ textAlign: "center" }}>{data.description}</div>
          }
        />
      ) : (
        <Meta
          title={<div style={{ textAlign: "center" }}>{data.title}</div>}
          description={
            <>
              <Flex justify="center" align="center">
                <Text delete strong style={{ fontSize: "1.3rem" }}>
                  Rs.{data.price}
                </Text>
                <Text type="secondary">Rs.{data.discount}</Text>
              </Flex>
            </>
          }
        />
      )}
    </Cards>
  );
};

export default Card;
