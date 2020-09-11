import React from "react";
import { Form, Input,Select } from "antd";

const { Option } = Select;

const AddForm = props => {
  
  return (
    <Form layout="vertical">
      <Form.Item
        name="type"
        label="Parent Category"
        initialValue = "0"
      >
        <Select>
          <Option value="0">Base</Option>
          <Option value="1">Categoty-1</Option>
          <Option value="2">Categoty-2</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Category Name">
        <Input placeholder="Please enter category name" />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
