import React from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Item = List.Item;
const ProductDetail = () => {
  const title = (
    <span>
      <ArrowLeftOutlined
        type="arrow-left"
        style={{ marginRight: 10, fontSize: 20 }}
      />
      <span>PRODUCT DETAIL</span>
    </span>
  );
  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="left">Product Name:</span>
          <span>name</span>
        </Item>
        <Item>
          <span className="left">Product Description:</span>
          <span>desc</span>
        </Item>
        <Item>
          <span className="left">Product Price:</span>
          <span>$ 200</span>
        </Item>
        <Item>
          <span className="left">Category:</span>
          <span>
            cat-1
          </span>
        </Item>
        <Item>
          <span className="left">Images:</span>
          <span>
            <img className="product-img" src="" alt=""/>
          </span>
        </Item>
        <Item>
          <span className="left">Product Detail:</span>
          <span dangerouslySetInnerHTML={{ __html: '<h1>Hello</h1>' }}></span>
        </Item>
      </List>
    </Card>
  );
};

export default ProductDetail;
