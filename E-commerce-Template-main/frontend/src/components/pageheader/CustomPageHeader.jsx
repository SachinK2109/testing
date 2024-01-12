import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CustomPageHeader = ({ title, subTitle, onBack, extra }) => {
  return (
    <div style={{ background: "#fff", padding: "16px" }}>
      <Row align="middle">
        <Col>
          {onBack && (
            <Button type="link" onClick={onBack} icon={<ArrowLeftOutlined />}>
              Back
            </Button>
          )}
        </Col>
        <Col flex="auto">
          <Title level={4} style={{ marginBottom: 0 }}>
            {title}
          </Title>
          {subTitle && <Text type="secondary">{subTitle}</Text>}
        </Col>
        <Col>{extra}</Col>
      </Row>
    </div>
  );
};

export default CustomPageHeader;
