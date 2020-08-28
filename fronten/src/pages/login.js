import React, { useState, useEffect } from "react";
import logo from "./images/logo.jpg";
import "./style/login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login(props) {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
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
                message:
                  "Please input your Password!"
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
