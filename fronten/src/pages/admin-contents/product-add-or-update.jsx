import React from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button"
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

const ProductAddOrUpdate = (props) => {
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
        <Form {...formItemLayout}>
          <Form.Item label="Product Name">
          <Input placeholder="please enter product name" />
          </Form.Item>
          <Form.Item label="Product Description">
          < TextArea autoSize={{ minRows: 2, maxRows: 6 }}/>
          </Form.Item>
          <Form.Item label="Product Price">
          <Input  prefix="$" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductAddOrUpdate;
