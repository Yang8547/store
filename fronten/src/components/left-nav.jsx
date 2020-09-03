import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./left-nav.css";
import logo from "../pages/images/logo.jpg";
import { Menu } from "antd";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import menuList from "../config/menucofig";

const { SubMenu } = Menu;
let openKeys; //opened submenu

const LeftNav = (props) => {
  // load menu list using map and recursion
  const loadMenuList_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {loadMenuList(item.children)}
          </SubMenu>
        );
      }
    });
  };

  // load menu list using reduce and recursion
  const loadMenuList = menuList => {
    const path = props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        // 找那个subitem和path路径一样
        const subItem = item.children.find(subItem=>{
          return subItem.key == path
        })
        // 如果有subitem被选中，openkey就是该subitem的parent的key
        if(subItem){
          openKeys = item.key;
          console.log('openkey',openKeys);
        }
        pre.push(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {loadMenuList(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  const MenuList = loadMenuList(menuList);

  // get current route path
  const path = props.location.pathname;
  // console.log('path',path);
  // console.log('openkey',openkeys);
  
  
  return (
    <div className="left-nav">
      {/* header */}
      <Link to="/admin/home" className="left-nav-header">
        <img src={logo} alt="" />
        <h1>Back Office</h1>
      </Link>
      {/* header end */}
      {/* menu */}
      {/* 不用defaultSelectedKeys因为只在初始选择一遍 */}
      {/* 用selectedKeys会自动根据value变换*/}
      <Menu selectedKeys={[path]} defaultOpenKeys={[openKeys]} mode="inline" theme="dark">
        {MenuList}
      </Menu>
      {/* menu end */}
    </div>
  );
};

export default withRouter(LeftNav);
