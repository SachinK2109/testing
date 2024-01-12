import React, { useEffect } from "react";
import { Row, Col, Typography, Button } from "antd";
import Card from "../card/Card";
import { contentDetail } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import { setNewProducts } from "../../state/reducers/productSlice";
const { Title, Text } = Typography;

const Content = () => {
  // const products = useSelector((state) => state.products.products);

  const newProducts = useSelector((state) => state.products.newProducts);
  const featuredProducts = useSelector(
    (state) => state.products.featuredProducts
  );
  const todaysDealProducts = useSelector(
    (state) => state.products.todaysDealProducts
  );
  // console.log("newProducts", newProducts);
  // console.log("featured", featuredProducts);
  // console.log("todays", todaysDealProducts);
  return (
    <>
      <Row
        gutter={[16, 16]}
        className="features-cateogry-products"
        style={{ margin: "2rem 0" }}
        justify="center"
        align="top"
      >
        {contentDetail.map(({ title, description }, i) => (
          <Col span={24} key={i}>
            <Title level={2}>{title}</Title>
            <Text type="secondary">{description}</Text>
            <Row gutter={[16, 16]} justify={"space-around"}>
              {i === 0
                ? newProducts.map((item, j) => (
                    <Col
                      xs={{ span: 12, offset: 0 }}
                      sm={{ span: 12, offset: 0 }}
                      md={{ span: 8, offset: 0 }}
                      lg={{ span: 6, offset: 0 }}
                      key={j}
                    >
                      <Card bordered={false} hoverable={true} data={item} />
                    </Col>
                  ))
                : i === 1
                ? featuredProducts.map((item, j) => (
                    <Col
                      xs={{ span: 12, offset: 0 }}
                      sm={{ span: 12, offset: 0 }}
                      md={{ span: 8, offset: 0 }}
                      lg={{ span: 6, offset: 0 }}
                      key={j}
                    >
                      <Card bordered={false} hoverable={true} data={item} />
                    </Col>
                  ))
                : todaysDealProducts.map((item, j) => (
                    <Col
                      xs={{ span: 12, offset: 0 }}
                      sm={{ span: 12, offset: 0 }}
                      md={{ span: 8, offset: 0 }}
                      lg={{ span: 6, offset: 0 }}
                      key={j}
                    >
                      <Card bordered={false} hoverable={true} data={item} />
                    </Col>
                  ))}
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Content;
