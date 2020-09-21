import React from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button"

const Item = List.Item;
const ProductDetail = props => {
  const product = props.location.state;
  const title = (
    <span>
      <LinkedButton onClick={()=>{props.history.goBack()}}>
      <ArrowLeftOutlined
        type="arrow-left"
        style={{ marginRight: 10, fontSize: 20 }}
      />
      </LinkedButton>
      
      <span>PRODUCT DETAIL</span>
    </span>
  );
  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="left">Product Name:</span>
          <span>{product.name}</span>
        </Item>
        <Item>
          <span className="left">Product Description:</span>
          <span>{product.desc}</span>
        </Item>
        <Item>
          <span className="left">Product Price:</span>
          <span>$ {product.price}</span>
        </Item>
        <Item>
          <span className="left">Category:</span>
          <span>cat-1</span>
        </Item>
        <Item>
          <span className="left">Images:</span>
          <span>
            {product.imgs.map(img => (
              <img className="product-img" src="" alt="" />
            ))}
          </span>
        </Item>
        <Item>
          <span className="left">Product Detail:</span>
          <span dangerouslySetInnerHTML={{ __html: product.detail }}></span>
        </Item>
      </List>
    </Card>
  );
};

export default ProductDetail;
