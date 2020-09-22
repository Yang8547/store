import React, { useState, useEffect } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button";
import { reqCategorys } from "../../api/index";
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
  //   const test_options = [
  //     {
  //       value: "zhejiang",
  //       label: "Zhejiang",
  //       isLeaf: false
  //     },
  //     {
  //       value: "jiangsu",
  //       label: "Jiangsu",
  //       isLeaf: false
  //     }
  //   ];
  const [options, setOptions] = useState([]);

  useEffect(() => {
    //   get base category list
    getCategories("0");
  },[]);

  //   fetch category list base
  const getCategories = parentID => {
    reqCategorys(parentID).then(res => {
      if (res.status === 0) {
        //   format options array
        const fetch_options = res.data.map(cat => {
          // return option object
          return {
            value: cat._id,
            label: cat.name,
            isLeaf: false
          };
        });

        setOptions(fetch_options);
      }
    });
  };

  /*
  load children options
   */

  const loadData = selectedOptions => {
    //   selected option object
    const targetOption = selectedOptions[0];
    // loading effect
    targetOption.loading = true;

    // load sub categories
    reqCategorys(targetOption.value).then(res => {
      targetOption.loading = false;

      //   format options array
      const children_options = res.data.map(cat => {
        // return option object
        return {
          value: cat._id,
          label: cat.name,
          isLeaf: true
        };
      });
      //   if no sub category
      if (children_options.length == 0) {
        targetOption.isLeaf = true;
      }
      //   add children category list to taget option
      targetOption.children = children_options;
      //   update state
      setOptions([...options]);
    });
  };

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
