import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Radio,
  Grid,
  Button,
  Flex,
  Pagination,
} from "antd";
import React, { useEffect, useState } from "react";
import SideNav from "../../components/sidenav/SideNav";
import { breadcrumbsData } from "./constant";
import { dummyProducts } from "../../constant";
import Card from "../../components/card/Card";
import { IconSquare, IconLayoutGrid, IconGridDots } from "@tabler/icons-react";
import { useSelector } from "react-redux";
const { useBreakpoint } = Grid;

const { Title } = Typography;

const Shop = () => {
  const screens = useBreakpoint();
  const products = useSelector((state) => state.products.products);
  // const [products, setData] = useState([]);
  const [layout, setLayout] = useState("multiple");
  const [currentPage, setCurrentPage] = useState(1);

  const [openDrawer, setOpenDrawer] = useState(false);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    screens.sm || screens.xs
      ? setLayout("single")
      : screens.md
      ? setLayout("double")
      : setLayout("multiple");
  }, [screens]);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Row style={{ height: "100%" }} id="shop-container" justify="center">
        <Col>
          <SideNav
            openDrawer={openDrawer}
            handleOpenDrawer={handleOpenDrawer}
          />
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: layout === "single" ? 16 : 14, offset: 0 }}
          lg={{ span: layout === "single" ? 16 : 14, offset: 0 }}
        >
          <Breadcrumb items={breadcrumbsData} />
          <Row gutter={[16, 16]} justify={"center"} style={{ padding: "1rem" }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
            >
              <Title level={1} style={{ textAlign: "center" }}>
                Chips & Dips(1)
              </Title>
            </Col>
            <Col>
              <Flex align="middle">
                <Button
                  onClick={handleOpenDrawer}
                  style={{ marginRight: "1rem" }}
                >
                  Filters
                </Button>
                <Radio.Group
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  optionType="button"
                >
                  <Radio.Button value="single">
                    <IconSquare />
                  </Radio.Button>
                  <Radio.Button value="double">
                    <IconLayoutGrid />
                  </Radio.Button>
                  {screens.lg && (
                    <Radio.Button value="multiple">
                      <IconGridDots />
                    </Radio.Button>
                  )}
                </Radio.Group>
              </Flex>
            </Col>
          </Row>
          <Row
            gutter={[16, 16]}
            wrap
            justify="center"
            align="middle"
            style={{ padding: "1rem" }}
          >
            {currentItems.map((item, i) => (
              <Col
                xs={{
                  span: layout === "single" ? 24 : 12,
                  offset: 0,
                }}
                sm={{
                  span: layout === "single" ? 24 : 12,
                  offset: 0,
                }}
                md={{
                  span: layout === "single" ? 24 : layout === "double" ? 12 : 8,
                  offset: 0,
                }}
                lg={{
                  span: layout === "single" ? 24 : layout === "double" ? 12 : 8,
                  offset: 0,
                }}
                key={i}
              >
                <Card
                  bordered={false}
                  hoverable={true}
                  data={item}
                  layout={layout}
                />
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <Col>
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={products.length}
                pageSize={itemsPerPage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Shop;
