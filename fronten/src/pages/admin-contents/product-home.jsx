import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined, PropertySafetyFilled } from "@ant-design/icons";
import LinkButton from "../../components/linked-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api/index";

const { Option } = Select;
const PAGE_SIZE = 3; //page size

const ProductHome = (props) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchName, setSearchName] = useState(""); //search name
  const [searchType, setSearchType] = useState("productName");  //search type productName/productDesc

  /*
  Get products
   */
  const getProducts = async pageNum => {
    let result;
    // if searchName is not empty
    if (searchName !== '') {
      result = await reqSearchProducts({pageNum,
        pageSize:PAGE_SIZE,
        searchName,
        searchType})
    } else{
      // normal get products
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    if (result.status === 0) {
      const { total, list } = result.data;
      setProducts(list);
      setTotal(total);
    }
  };

  useEffect(() => {
    getProducts(pageNum);
  }, [pageNum]);

  /*
  update product status on/off market
  */
  const updateStatus = (productID, status)=>{
    reqUpdateStatus(productID,status).then((res)=>{
      message.success("updated!");
      //refresh
      getProducts(pageNum);
    }
    )
  }

  const title = (
    <span>
      <Select value={searchType} style={{ width: 150 }} onChange={(value)=>setSearchType(value)}>
        <Option value="productName">Search By Name</Option>
        <Option value="productDesc">Search By Desc</Option>
      </Select>
      <Input placeholder="Key Word" style={{ width: 150, margin: "0 15px" }} value={searchName} onChange={(e)=>setSearchName(e.target.value)}/>
      <Button type="primary" onClick={()=>getProducts(1)}>Search</Button>
    </span>
  );

  const extra = (
    <Button type="primary" onClick={()=>props.history.push('/admin/product/addorupdate')}>
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
          <Button type="primary" onClick={()=>updateStatus(record._id,record.status===1?0:1)}>{record.status===1?'OFF':'ON'}</Button>
          <span>{record.status===1?'OnMarket':'OffMarket'}</span>
        </span>
      )
    },
    {
      title: "Action",
      width: 100,
      render: record => (
        <span>
          <LinkButton onClick={()=>props.history.push('/admin/product/detail',record)}>Detail</LinkButton>
          <LinkButton onClick={()=>props.history.push('/admin/product/addorupdate',record)}>Edit</LinkButton>
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
          onChange: pageNum => setPageNum(pageNum)
        }}
      />
    </Card>
  );
};

export default ProductHome;
