import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import logo from "./images/logo.jpg";
import "./style/login.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ajax from "../api/ajax";
import Cookies from "js-cookie";

function Login(props) {
  const onFinish = async values => {
    // console.log("Received values of form: ", values);
    //登录
    const { username, password } = values;
    const result = await ajax("/login", { username, password }, "POST");
    console.log(result);
    //登录成功
    if (result.status == 0) {
      message.success("Login Successful!");
      // add userinfo to cookie
      Cookies.set("userinfo", JSON.stringify(result.data));
      // 跳转到主页面
      props.history.replace("/admin");
    } else {
      //登录失败
      message.error("username or password not correct");
    }
  };

  // check useinfo, if userinfo redirect to admin home
  // 如果已经登录，自动从login跳转到adminhome
  const userinfo = Cookies.getJSON("userinfo") || {};
  return userinfo._id ? (
    <Redirect to="/admin" />
  ) : (
    <div>
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>Merchant Center</h1>
      </header>
      <section className="login-form">
        <h3>Login</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your Username!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              },
              {
                min: 4,
                max: 12,
                pattern: /^[0-9a-zA-Z_]+$/,
                message:
                  "The length must be 4-12 and should be combination of numbers, alphabets or underline"
              }
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default Login;
