import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Row style={{ padding: "2rem" }}>
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
            >
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Title>Contact Us</Title>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a subject",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please select a category",
                    },
                  ]}
                >
                  <Select placeholder="Select a category">
                    <Option value="product">Product Inquiry</Option>
                    <Option value="shipping">Shipping Inquiry</Option>
                    <Option value="payment">Payment Inquiry</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              style={{ textAlign: "center" }}
            >
              <Title level={5}>
                Who isn't excited for a big box of delicious goodies?
              </Title>
              <Image
                preview={false}
                style={{ padding: "0px 20px" }}
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="contact"
              />
              <Text type="secondary">
                If you'd like an update regarding the status of your order,
                simply get in touch with us, via ecom@gmail.com or 555-555-555
              </Text>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default Contact;
