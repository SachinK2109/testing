import React from "react";
import Carousel from "../carousel/Carousel";
import { Row, Col, Typography } from "antd";
import Card from "../card/Card";
import { serviceInfo } from "./constant";
import "./Dashboard.css";
import Content from "../content/Content";

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <>
      <Row id="dashboard-container" justify="center" align="middle">
        <Col span={24} className="carousel-container">
          <Carousel />
        </Col>
        <Row
          gutter={[16, 16]}
          className="card-container"
          style={{ margin: "2rem 0" }}
          justify="center"
          align="top"
        >
          {serviceInfo.map((item, i) => (
            <Col
              xs={{ span: 12, offset: 0 }}
              sm={{ span: 12, offset: 0 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 4, offset: 0 }}
              key={i}
            >
              <Card
                bordered={true}
                hoverable={false}
                data={item}
                // width={150}
                // height={150}
              />
            </Col>
          ))}
          <Content />
        </Row>
      </Row>
    </>
  );
};

export default Dashboard;
