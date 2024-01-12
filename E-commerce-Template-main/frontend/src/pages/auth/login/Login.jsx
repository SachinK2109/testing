import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Checkbox,
  Card,
  Flex,
  Divider,
  Typography,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../../services/userDataService";
import { loginAdmin } from "../../../services/adminDataService";
import { useDispatch } from "react-redux";
import {
  loginBegin,
  loginSuccess,
  loginFail,
} from "../../../state/reducers/loginSlice";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [remember, setRemember] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const showForgotPasswordModal = () => {
    setForgotPasswordVisible(true);
  };

  const closeForgotPasswordModal = () => {
    setForgotPasswordVisible(false);
  };
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      dispatch(loginBegin());
      const res = await loginUser(values);
      localStorage.setItem("token", res.data.data);
      console.log(res);
      dispatch(loginSuccess());
      navigate("/");
    } catch (err) {
      dispatch(loginFail({ err }));
    }
  };

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        User login
      </Typography.Title>
      <Row style={{ margin: "1rem" }}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 14, offset: 6 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
          xl={{ span: 8, offset: 8 }}
        >
          <Card>
            <Form
              form={form}
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              {/* <Form.Item name="remember"> */}
              <Checkbox
                checked={remember}
                onChange={() => setRemember(!remember)}
              >
                Remember Me
              </Checkbox>
              {/* </Form.Item> */}
              <Flex gap={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="button">
                    Reset
                  </Button>
                </Form.Item>
              </Flex>
              <Divider />
              <Flex vertical align="center" gap={4}>
                <Text>
                  Don't have a account?
                  <Link to={"/register"}>Register now</Link>
                </Text>
                <Text
                  style={{ whiteSpace: "nowrap" }}
                  onClick={showForgotPasswordModal}
                >
                  Don't remember your password?
                  <Button
                    to={"/"}
                    // visible={forgotPasswordVisible}
                    onClose={closeForgotPasswordModal}
                  >
                    Forget Password
                  </Button>
                </Text>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
