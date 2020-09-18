import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/linked-button";
import { reqProducts } from "../../api/index";

const { Option } = Select;
const PAGE_SIZE = 3; //page size

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  /*
  Get products
   */
  const getProducts = async pageNum => {
    const result = await reqProducts(pageNum, PAGE_SIZE);
    if (result.status === 0) {
      const { total, list } = result.data;
      setProducts(list);
      setTotal(total);
    }
  };

  useEffect(() => {
    getProducts(pageNum);
  },[pageNum]);

  const title = (
    <span>
      <Select value="0" style={{ width: 150 }}>
        <Option value="0">Search By Name</Option>
        <Option value="1">Search By Desc</Option>
      </Select>
      <Input placeholder="Key Word" style={{ width: 150, margin: "0 15px" }} />
      <Button type="primary">Search</Button>
    </span>
  );

  const extra = (
    <Button type="primary">
      <PlusOutlined />
      ADD PRODUCT
    </Button>
  );

  const columns = [
    {
      title: "Name", //column title
      dataIndex: "name" //corresponding key in data
    },
    {
      title: "Description", //column title
      dataIndex: "desc" //corresponding key in data
    },
    {
      title: "Price", //column title
      render: record => "$" + record.price
    },

    {
      title: "Status",
      width: 100,
      render: record => (
        <span>
          <Button type="primary">OFF</Button>
          <span>OnMarket</span>
        </span>
      )
    },
    {
      title: "Action",
      width: 100,
      render: record => (
        <span>
          <LinkButton>Detail</LinkButton>
          <LinkButton>Edit</LinkButton>
        </span>
      )
    }
  ];

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        rowKey="_id"
        dataSource={products}
        columns={columns}
        pagination={{
          current: pageNum,
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: (pageNum)=>setPageNum(pageNum)
        }}
      />
    </Card>
  );
};

export default ProductHome;
