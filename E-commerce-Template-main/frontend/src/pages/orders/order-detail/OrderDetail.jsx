import React from "react";
import {
  Card,
  List,
  Typography,
  Descriptions,
  Divider,
  Tag,
  Button,
} from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import CustomPageHeader from "../../../components/pageheader/CustomPageHeader";
import { Link, useLocation } from "react-router-dom";
import "./OrderDetails.css"; // Importing a CSS file for styling

const OrderDetails = () => {
  const location = useLocation();
  const { state: order } = location;

  const handlePrintInvoice = () => {
    // Implement print functionality
    console.log("Printing invoice...");
    window.print();
  };

  if (!order) {
    return <div className="loading">Loading...</div>;
  }

  const renderStatusTag = (status) => {
    let color = status === "Pending" ? "volcano" : "green";
    let icon =
      status === "Pending" ? <ClockCircleOutlined /> : <CheckCircleOutlined />;
    return (
      <Tag color={color} icon={icon} className="status-tag">
        {status}
      </Tag>
    );
  };

  return (
    <div className="order-details-container">
      <CustomPageHeader
        onBack={() => window.history.back()}
        title="Order Details"
        subTitle={`Order ID: ${order._id}`}
        extra={[
          <Button key="1" type="primary" onClick={handlePrintInvoice}>
            Print Invoice
          </Button>,
        ]}
      />
      <div className="order-info-section">
        <Descriptions bordered column={1} className="order-descriptions">
          <Descriptions.Item label="Order ID">{order._id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            {renderStatusTag(order.status)}
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            {new Date(order.createdAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Divider orientation="left" className="products-divider">
        Products
      </Divider>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={order.products}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              className="product-card"
              cover={
                <img
                  alt={item.productId.title}
                  src={item.productId.imageUrl}
                  width={50}
                />
              }
            >
              <Descriptions size="small" column={1}>
                <Descriptions.Item label="Price">
                  Rs. {item.productId.price}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  {item.quantity}
                </Descriptions.Item>
                <Descriptions.Item label="Brand">
                  {item.productId.brand}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </List.Item>
        )}
        className="products-list"
      />
    </div>
  );
};

export default OrderDetails;
