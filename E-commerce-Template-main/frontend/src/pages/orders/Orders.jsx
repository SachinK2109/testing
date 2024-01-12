import React from "react";
import OrderCard from "../../components/card/order-card/OrderCard";
import { Col, Flex, Row, Typography } from "antd";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const Orders = () => {
  const orders = useSelector((state) => state.order.order);
  console.log(orders);
  return (
    <>
      <Row justify="center" gutter={[0, 16]} style={{ padding: "1rem" }}>
        <Col span={16}>
          <Title level={4}>Order History</Title>
          <Text type="secondary" strong>
            2 Orders
          </Text>
        </Col>
        <Col span={22}>
          <OrderCard data={orders} />
        </Col>
        {/* <Col span={22}>
          <OrderCard />
        </Col> */}
      </Row>
    </>
  );
};

export default Orders;
