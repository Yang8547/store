import React, { useEffect } from "react";
import { Form, Input } from "antd";

const UpdateForm = props => {
   // control form use Form.useForm()
  const [form] = Form.useForm();
  useEffect(() => {
    props.setFormUpdate(form); 
    // set input value
    form.setFieldsValue({
      new_cat_name: props.currentCategory.name
    });
  });
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="Category Name"
        name="new_cat_name"
        rules={[{ required: true, message: "Please Enter the new category name!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
