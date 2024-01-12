import React from "react";
import { getItems } from "./constant";
// import { Menu, Button } from "antd";
import { Drawer, Collapse, theme } from "antd";

import "./SideNav.css";

const SideNav = ({ openDrawer, handleOpenDrawer }) => {
  const onClose = () => {
    handleOpenDrawer();
  };
  const { token } = theme.useToken();
  return (
    <>
      <Drawer
        title="Filters"
        placement="left"
        onClose={onClose}
        open={openDrawer}
      >
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          {getItems.map((item) => (
            <Collapse.Panel key={item.key} header={item.label}>
              {item.children}
            </Collapse.Panel>
          ))}
        </Collapse>
      </Drawer>
    </>
  );
};

export default SideNav;
