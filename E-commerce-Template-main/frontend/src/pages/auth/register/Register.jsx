import React from "react";
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
import { registerUser } from "../../../services/userDataService";
import { useDispatch } from "react-redux";
import {
  postRegisterBegin,
  postRegisterSuccess,
  postRegisterFail,
} from "../../../state/reducers/registerSlice";
import { registerAdmin } from "../../../services/adminDataService";

const { Text } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      if (!location.pathname.includes("/admin")) {
        // console.log(values);
        dispatch(postRegisterBegin());
        await registerUser(values);
        dispatch(postRegisterSuccess());
        navigate("/login");
      } else {
        dispatch(postRegisterBegin());
        await registerAdmin(values);
        dispatch(postRegisterSuccess());
      }
    } catch (err) {
      dispatch(postRegisterFail({ err }));
    }
  };
  return (
    <>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        {!location.pathname.includes("/admin") ? "User Login" : "Admin Login"}
      </Typography.Title>
      <Row style={{ margin: "1rem" }}>
        <Col span={8} offset={8}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item label="First Name" name="firstName">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <Input />
              </Form.Item>
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
              {/* <Form.Item name="condition"> */}
              <Checkbox>
                {/* By signing up, you will be enrolled to our Rewards Program where
                you can earn points for actions such as Sign up, Product
                Purchase, Product Review, etc and redeem earned points for a
                discount on future purchases */}
                By signing up,you are agreeing to Our terms and conditions
              </Checkbox>
              {/* </Form.Item> */}
              <Flex gap={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
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
                  Already have a account?<Link to={"/login"}>Login now</Link>
                </Text>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Register;
