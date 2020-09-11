import React from "react";
import { Form, Input } from "antd";

const UpdateFrom = props => {
  return (
    <Form layout="vertical">
      <Form.Item label="Category Name">
        <Input placeholder="Please enter category name" />
      </Form.Item>
    </Form>
  );
};

export default UpdateFrom;
