import { Button, Form } from "antd";
import React from "react";

const { Item } = Form;

const NewsLetter = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Form form={form}>
        <Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Item>
        <Button type="primary">Subscribe</Button>
      </Form>
    </>
  );
};

export default NewsLetter;
