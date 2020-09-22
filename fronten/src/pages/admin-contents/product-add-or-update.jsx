import React, { useState, useEffect } from "react";
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

const ProductAddOrUpdate = props => {
  // test cascader options
  const test_options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      isLeaf: false
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      isLeaf: false
    }
  ];
  const [options, setOptions] = useState(test_options);

  /*
  load children options
   */  
  const loadData = selectedOptions => {
    //   selected option object
    const targetOption = selectedOptions[0];
    // loading effect
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1"
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2"
        }
      ];
      setOptions([...options]);
    }, 1000);
  }

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
  //   form submit
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };
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
                //   price must be positive
                validator: (_, value) =>
                  value * 1 > 0
                    ? Promise.resolve()
                    : Promise.reject("Price must larger than 0")
              }
            ]}
          >
            <Input prefix="$" />
          </Form.Item>

          {/* cascader */}
          <Form.Item label="Product Category" name="category">
            <Cascader options={options} loadData={loadData} />
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
