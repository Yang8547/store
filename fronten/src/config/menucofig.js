import React from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  WindowsOutlined,
  AreaChartOutlined
} from "@ant-design/icons";
const menuList = [
  {
    title: "HOME", // title
    key: "/admin/home", // path
    icon: <HomeOutlined />, // icon
    isPublic: true //
  },
  {
    title: "PRODUCT",
    key: "/admin/products",
    icon: <AppstoreOutlined />,
    children: [
      // submenu
      {
        title: "CATEGORY",
        key: "/admin/category",
        icon: <BarsOutlined />
      },
      {
        title: "PRODUCT",
        key: "/admin/product",
        icon: <ToolOutlined />
      }
    ]
  },

  {
    title: "USER",
    key: "/admin/user",
    icon: <UserOutlined />
  },
  {
    title: "ROLE",
    key: "/admin/role",
    icon: <SafetyOutlined />
  },

  {
    title: "CHART",
    key: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "BAR CHART",
        key: "/admin/charts/bar",
        icon: <BarChartOutlined />
      },
      {
        title: "LINE CHART",
        key: "/admin/charts/line",
        icon: <LineChartOutlined />
      },
      {
        title: "PIE CHART",
        key: "/admin/charts/pie",
        icon: <PieChartOutlined />
      }
    ]
  },

  {
    title: "ORDER",
    key: "/admin/order",
    icon: <WindowsOutlined />
  }
];

export default menuList;
