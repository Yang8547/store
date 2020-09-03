import React from "react";
import { Link } from "react-router-dom";
import "./left-nav.css";
import logo from "../pages/images/logo.jpg";
import { Menu } from "antd";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import menuList from "../config/menucofig";

const { SubMenu } = Menu;

const LeftNav = () => {
  // load menu list using map and recursion
  const loadMenuList = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
           {loadMenuList(item.children)}
          </SubMenu>
        )
      }
    });
  };
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
        {loadMenuList(menuList)}
      </Menu>
      {/* menu end */}
    </div>
  );
};

export default LeftNav;
