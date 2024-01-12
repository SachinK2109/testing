import React from "react";
import {
  Divider,
  Typography,
  Row,
  Col,
  Flex,
  Tooltip,
  Button,
  Collapse,
  theme,
  Grid,
} from "antd";
import { copyrights } from "../../constant";
import { CaretRightOutlined } from "@ant-design/icons";
import { footerInfo, footerOther } from "./constant";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Footer = () => {
  const screens = useBreakpoint();
  const isXsOrSm = screens.xs;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
        >
          {isXsOrSm ? (
            <Collapse expandIconPosition="end" ghost>
              <Collapse.Panel
                header={<Title level={4}>{footerInfo.title}</Title>}
              >
                <Paragraph>{footerInfo.description}</Paragraph>
                <Paragraph strong underline style={{ whiteSpace: "nowrap" }}>
                  {footerInfo.gmail.icon}
                  {footerInfo.gmail.mail}
                </Paragraph>
                <Paragraph strong underline style={{ whiteSpace: "nowrap" }}>
                  {footerInfo.phone.icon}
                  {footerInfo.phone.number}
                </Paragraph>
                <Flex justify="start" gap={4}>
                  {footerInfo.icons.map(({ tooltip, icon }, i) => (
                    <Tooltip key={i} title={tooltip}>
                      <Button type="primary" shape="circle" icon={icon} />
                    </Tooltip>
                  ))}
                </Flex>
              </Collapse.Panel>
            </Collapse>
          ) : (
            <Flex align="start" vertical gap={2}>
              <Title level={4}>{footerInfo.title}</Title>
              <Paragraph>{footerInfo.description}</Paragraph>
              <Paragraph strong underline style={{ whiteSpace: "nowrap" }}>
                {footerInfo.gmail.icon}
                {footerInfo.gmail.mail}
              </Paragraph>
              <Paragraph strong underline style={{ whiteSpace: "nowrap" }}>
                {footerInfo.phone.icon}
                {footerInfo.phone.number}
              </Paragraph>
              <Flex justify="start" gap={4}>
                {footerInfo.icons.map(({ tooltip, icon }, i) => (
                  <Tooltip key={i} title={tooltip}>
                    <Button type="primary" shape="circle" icon={icon} />
                  </Tooltip>
                ))}
              </Flex>
            </Flex>
          )}
        </Col>
        {footerOther.map(({ title, items }, i) => (
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 4, offset: 2 }}
            lg={{ span: 4, offset: 2 }}
            key={i}
          >
            {isXsOrSm ? (
              <Collapse expandIconPosition="end" ghost>
                <Collapse.Panel header={<Title level={4}>{title}</Title>}>
                  <Flex align="start" vertical gap={1}>
                    {items.map((item, i) => (
                      <Text key={i}>{item}</Text>
                    ))}
                  </Flex>
                </Collapse.Panel>
              </Collapse>
            ) : (
              <>
                <Title level={4} style={{ whiteSpace: "nowrap" }}>
                  {title}
                </Title>
                <Flex align="start" vertical gap={1}>
                  {items.map((item, i) => (
                    <Text key={i}>{item}</Text>
                  ))}
                </Flex>
              </>
            )}
          </Col>
        ))}
      </Row>
      <Divider plain />
      <Title level={5} type="secondary" style={{ textAlign: "center" }}>
        {copyrights}
      </Title>
    </>
  );
};

export default Footer;
