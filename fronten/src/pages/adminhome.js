import React from "react";
import Cookies from "js-cookie";
import { Layout } from "antd";
import Header from "../components/header";
import LeftNav from "../components/left-nav"

function Adminhome() {
  const { Footer, Sider, Content } = Layout;
  const userinfo = Cookies.get("userinfo")
    ? JSON.parse(Cookies.get("userinfo"))
    : {};
  return (
    <>
      <Layout style={{height:"100%"}}>
        <Sider>
            <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{backgroundColor:"#fff"}}>Content</Content>
          <Footer style={{backgroundColor:"#ccccc", textAlign:"center"}}>Copy right reserved</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Adminhome;
