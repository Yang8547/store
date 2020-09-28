import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button";
import { reqCategory } from "../../api/index";

const BASE_IMG_URL = 'http://localhost:5000/upload/'

const Item = List.Item;
const ProductDetail = props => {
  const [cName1, setCName1] = useState(); // category
  const [cName2, setCName2] = useState(); // sub category
  const product = props.location.state;

  useEffect(() => {
    // if base category
    if (product.pCategoryId === '0') {
      reqCategory(product.categoryId).then(res => setCName1(res.data.name));
    } else {
        // if not base category get cat name and parent cat name
      Promise.all(
        [reqCategory(product.categoryId),
        reqCategory(product.pCategoryId)]
      ).then(res => {
        setCName1(res[1].data.name);
        setCName2(res[0].data.name)
      });
    }
  });
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
          <span>{cName1} {cName2?"--> "+cName2:''}</span>
        </Item>
        <Item>
          <span className="left">Images:</span>
          <span>
            {product.imgs.map(img => (
              <img className="product-img" src={BASE_IMG_URL+img} alt="" />
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
