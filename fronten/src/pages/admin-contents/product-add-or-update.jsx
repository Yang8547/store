import React from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button";
import { number } from "prop-types";
// form layout
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 8
  }
};
const { TextArea } = Input;

const onFinish = values => {
  console.log("Received values of form: ", values);
};

const ProductAddOrUpdate = props => {
  const title = (
    <span>
      <LinkedButton
        onClick={() => {
          props.history.goBack();
        }}
      >
        <ArrowLeftOutlined
          type="arrow-left"
          style={{ marginRight: 10, fontSize: 20 }}
        />
      </LinkedButton>

      <span>ADD PRODUCT</span>
    </span>
  );
  return (
    <div>
      <Card title={title} className="product-add">
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter product name"
              }
            ]}
          >
            <Input placeholder="please enter product name" />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="desc"
            rules={[
              {
                required: true,
                message: "Please enter product description"
              }
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter product price"
              },
              {
                type: "number",
                message: "Price must be number"
              },
              {
                validator: (_, value) =>
                  value*1>0 ? Promise.resolve() : Promise.reject('Price must larger than 0'),
              },
            ]}
          >
            <Input prefix="$" />
          </Form.Item>

          {/* submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductAddOrUpdate;
