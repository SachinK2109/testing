import React from "react";
import { Typography, Row, Col, Card, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "./About.css";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div id="about-container">
      <Title>About Us</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Card.Meta
              avatar={<Avatar size={64} icon={<UserOutlined />} />}
              title="Who We Are"
              description="We are a leading FMCG e-commerce platform, dedicated to providing customers with high-quality products."
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Card.Meta
              avatar={<Avatar size={64} icon={<ShoppingCartOutlined />} />}
              title="What We Offer"
              description="Our platform offers a wide range of FMCG products, including groceries, personal care, household items, and more."
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Card.Meta
              avatar={<Avatar size={64} icon={<CreditCardOutlined />} />}
              title="Secure Shopping"
              description="We prioritize the security of our customers' information and ensure a safe shopping experience."
            />
          </Card>
        </Col>
      </Row>
      <Paragraph className="mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet
        eleifend sapien, eu tempor libero sollicitudin nec. Donec eget
        consectetur elit. Nullam vel tempor nisi. In dignissim mi ut nunc
        efficitur, non pellentesque diam venenatis. Sed varius est ipsum, ac
        malesuada magna cursus eget. Curabitur diam ligula, viverra vel ex id,
        bibendum venenatis augue. Morbi porttitor libero et purus congue, vitae
        fermentum odio viverra.
      </Paragraph>
    </div>
  );
};

export default About;
