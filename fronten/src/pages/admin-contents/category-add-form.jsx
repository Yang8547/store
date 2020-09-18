import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddForm = props => {

const [form] = Form.useForm();
  useEffect(() => {
    //  lift form
    props.setAddForm(form);
    // set input value
    form.setFieldsValue({
        type: props.parentId
    });
  });

  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="type" label="Parent Category" initialValue={props.parentId}>
        <Select>
          <Option value="0">Base</Option>
          {/* BUG TODO when in sub-cat, the option is wrong */}
          {props.categorys.map((option)=><Option value={option._id} key={option._id}>{option.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="Category Name" name="categoryName">
        <Input placeholder="Please enter category name" />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
