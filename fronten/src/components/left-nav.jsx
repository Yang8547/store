import React from "react";
import { Link } from "react-router-dom";
import "./left-nav.css";
import logo from "../pages/images/logo.jpg";
import { Menu } from "antd";
import {
  PieChartOutlined,
  MailOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

const LeftNav = () => {
  return (
    <div className="left-nav">
      {/* header */}
      <Link to="/admin/home" className="left-nav-header">
        <img src={logo} alt="" />
        <h1>Back Office</h1>
      </Link>
      {/* header end */}
      {/* menu */}
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          HOME
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5" icon={<MailOutlined />}>Categories</Menu.Item>
          <Menu.Item key="6" icon={<MailOutlined />}>Products</Menu.Item>
        </SubMenu>
      </Menu>
      {/* menu end */}
    </div>
  );
};

export default LeftNav;
