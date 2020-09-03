import React from "react";
import { Link } from "react-router-dom";
import "./left-nav.css";
import logo from "../pages/images/logo.jpg";
import { Menu } from "antd";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";

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
      <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark">
        <Menu.Item key="/admin/home" icon={<PieChartOutlined />}>
          <Link to="/admin/home">HOME</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="PRODUCTS">
          <Menu.Item key="5" icon={<MailOutlined />}>
            <Link to="/admin/category">Categories</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<MailOutlined />}>
            <Link to="/admin/product">Products</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/admin/user" icon={<PieChartOutlined />}>
          <Link to="/admin/user">USER</Link>
        </Menu.Item>
        <Menu.Item key="/admin/role" icon={<PieChartOutlined />}>
          <Link to="/admin/role">ROLE</Link>
        </Menu.Item>
      </Menu>
      {/* menu end */}
    </div>
  );
};

export default LeftNav;
