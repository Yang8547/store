import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Layout } from "antd";
import Header from "../components/header";
import LeftNav from "../components/left-nav";
import Home from "./admin-contents/home";
import Category from "./admin-contents/category";
import Product from "./admin-contents/product";
import Role from "./admin-contents/role";
import User from "./admin-contents/user";
import Bar from "./admin-contents/bar";
import Line from "./admin-contents/line";
import Pie from "./admin-contents/pie";
import NotFound from "./admin-contents/not-found";
import Order from "./admin-contents/order";

const Adminhome = props => {
  const { Footer, Sider, Content } = Layout;
  const userinfo = Cookies.getJSON("userinfo") || {};
  return !userinfo._id ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin:20,backgroundColor: "#fff" }}>
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/category" component={Category} />
              <Route path="/admin/product" component={Product} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/order" component={Order} />
              {/* redirect /admin to /admin/home */}
              <Redirect from="/admin" exact to="/admin/home" />
              {/* not match route display not found */}
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: "#ccccc", textAlign: "center" }}>
            Copy right reserved
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Adminhome;
