import { Badge, Card, Typography, Row, Col, Flex, Button, Image } from "antd";
import { IconPointFilled } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OrderCard = ({ data }) => {
  console.log("data", data);
  const navigate = useNavigate();
  return (
    <>
      {data.map((item) => (
        <Row justify="center">
          <Col xs={24} xl={18}>
            <Card style={{ backgroundColor: "whitesmoke" }}>
              <Row gutter={[0, 16]} justify="space-between" align="middle" wrap>
                <Col span={24}>
                  <Row justify="space-between" align="middle">
                    <Col span={12}>
                      <Flex align="middle">
                        <IconPointFilled style={{ color: "green" }} />
                        <Title level={5}>{item.status}</Title>
                      </Flex>
                    </Col>
                    <Col xs={12} lg={6} style={{ textAlign: "center" }}>
                      <Card>Expected on Mon,12 July</Card>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={16}>
                  <Row
                    style={{
                      maxHeight: 256,
                      overflowY: "auto",
                      width: "fit-content",
                    }}
                    gutter={[8, 8]}
                  >
                    {item.products.map((product) => (
                      <Col xs={24} md={12}>
                        <Card bordered={false}>
                          <Flex
                            wrap="wrap"
                            justify="space-between"
                            align="center"
                          >
                            <Image
                              src={product.productId.imageUrl}
                              width={80}
                            />
                            <Text>{product.productId.title}</Text>
                            <Text>{product.quantity}</Text>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                    {/* <Col xs={24} md={12}>
                      <Card bordered={false}>
                        <Flex
                          wrap="wrap"
                          justify="space-between"
                          align="center"
                        >
                          <Image
                            src="https://images-cdn.ubuy.co.in/63517777113a674a7d0bfce9-cheetos-flamin-hot-crunchy-cheese.jpg"
                            width={80}
                            height={80}
                          />
                          <Text>Cheetos</Text>
                          <Text>x2</Text>
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card bordered={false}>
                        <Flex
                          wrap="wrap"
                          justify="space-between"
                          align="center"
                        >
                          <Image
                            src="https://m.media-amazon.com/images/I/41AsllSnTCL._SX300_SY300_QL70_FMwebp_.jpg"
                            width={80}
                          />
                          <Text>Pringles</Text>
                          <Text>x2</Text>
                        </Flex>
                      </Card>
                    </Col> */}
                  </Row>
                </Col>
                <Col xs={24} md={6}>
                  <Flex vertical gap={6}>
                    <Button type="primary">Track Orders</Button>
                    <Button
                      onClick={() =>
                        navigate(`/order-details/${item._id}`, { state: item })
                      }
                    >
                      View Order Details
                    </Button>
                    <Button type="text">Get Invoice</Button>
                    {/* <Button type="text">Edit Order</Button> */}
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default OrderCard;
