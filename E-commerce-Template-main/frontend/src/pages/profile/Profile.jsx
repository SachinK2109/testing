import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  Tabs,
  Form,
  Input,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../state/reducers/userSlice";
import { updateProfile } from "../../services/userDataService";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.order.order);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showCityInput, setShowCityInput] = useState(false);
  const [showStateInput, setShowStateInput] = useState(false);
  const [showPostalCodeInput, setShowPostalCodeInput] = useState(false);
  const [showCountryInput, setShowCountryInput] = useState(false);

  const handleChange = (fieldName, value) => {
    const updatedValues = { ...form.getFieldsValue(), [fieldName]: value };
    dispatch(updateUser(updatedValues));
  };

  const handleAddInput = (field) => {
    switch (field) {
      case "phone":
        setShowPhoneInput(true);
        break;
      case "city":
        setShowCityInput(true);
        break;
      case "state":
        setShowStateInput(true);
        break;
      case "postalCode":
        setShowPostalCodeInput(true);
        break;
      case "country":
        setShowCountryInput(true);
        break;
      default:
        break;
    }
  };

  const onFinish = async (values) => {
    const res = await updateProfile(values);
    console.log(values);
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || "",
      city: userData.city || "",
      state: userData.state || "",
      postalCode: userData.postalCode || "",
      country: userData.country || "",
    });
  }, [userData, form]);

  const items = [
    {
      key: "1",
      label: "Account Settings",
      children: (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Text
                  strong
                  style={{ fontSize: 18 }}
                  editable={{
                    onChange: (value) => handleChange("firstName", value),
                  }}
                >
                  {userData.firstName}
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Last Name" name="lastName">
                <Text
                  strong
                  style={{ fontSize: 18 }}
                  editable={{
                    onChange: (value) => handleChange("lastName", value),
                  }}
                >
                  {userData.lastName}
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Phone Number" name="phone">
                {userData.phone && !showPhoneInput ? (
                  <Text
                    strong
                    style={{ fontSize: 18 }}
                    editable={{
                      onChange: (value) => handleChange("phone", value),
                    }}
                  >
                    {userData.phone}
                  </Text>
                ) : (
                  <Input
                    defaultValue={userData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    autoFocus={true}
                  />
                )}

                {!userData.phone && !showPhoneInput && (
                  <Button onClick={() => setShowPhoneInput(true)}>
                    Add Phone
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Email Address" name="email">
                <Text strong style={{ fontSize: 18 }}>
                  {userData.email}
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="City" name="city">
                {userData.city || showCityInput ? (
                  <Input
                    defaultValue={userData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                ) : (
                  <Button onClick={() => handleAddInput("city")}>
                    Add City
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="State" name="state">
                {userData.state || showStateInput ? (
                  <Input
                    defaultValue={userData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                ) : (
                  <Button onClick={() => handleAddInput("state")}>
                    Add State
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Postalcode" name="postalCode">
                {userData.postalCode || showPostalCodeInput ? (
                  <Input
                    defaultValue={userData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                  />
                ) : (
                  <Button onClick={() => handleAddInput("postalCode")}>
                    Add Postal Code
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Country" name="country">
                {userData.country || showCountryInput ? (
                  <Input
                    defaultValue={userData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                ) : (
                  <Button onClick={() => handleAddInput("country")}>
                    Add Country
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button size="large" type="primary" htmlType="submit">
                Apply Changes
              </Button>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      justify="center"
      align="top"
      style={{ margin: "1rem" }}
    >
      <Col xs={24} sm={20} md={16} lg={8} xl={6}>
        <Card>
          <Row justify="center">
            <Col>
              <Avatar src={userData.picture} size={128} />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Title
                level={3}
              >{`${userData.firstName} ${userData.lastName}`}</Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: 16 }}>
                Orders Placed: {orders.length}
              </Text>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: 16 }}>
                Wishlist Items: 0
              </Text>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: 16 }}>
                Favourite Items: 0
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
