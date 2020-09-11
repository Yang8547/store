import React, { useState, useEffect } from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategorys } from "../../api";
import LinkedButton from "../../components/linked-button";

const Category = () => {
  const [categorys, setCategorys] = useState([]); //category list
  const [loading, setLoading] = useState(false); //loading status
  const [parentId, setParentId] = useState("0"); //parent id will triger fetch data
  const [parentName, setParentName] = useState(""); //parent name display on table header

  //   update parentId then triger update
  const showSubCategory = category => {
    setParentName(category.name);
    setParentId(category._id);
  };

  //   fetch category
  const showCategorys = () => {
    setParentId("0"); //   update parentId then triger update
    setParentName("");
  };

  //   card header
  const title =
    parentId == "0" ? (
      "CATEGORY"
    ) : (
      <>
        <LinkedButton onClick={showCategorys}>CATEGORY</LinkedButton>
        <ArrowRightOutlined style={{ margin: "0 10px" }} />
        <span>{parentName}</span>
      </>
    );
  const extra = (
    <Button type="primary">
      <PlusOutlined />
      ADD
    </Button>
  );

  const columns = [
    {
      title: "Name", //column title
      dataIndex: "name" //corresponding key in data
    },

    {
      title: "Action",
      width: "30%",
      render: record => (
        <Space size="middle">
          <a>Edit</a>
          {parentId =="0" ? <a onClick={() => showSubCategory(record)}>Sub-Category</a> : null}
          
        </Space>
      )
    }
  ];

  useEffect(() => {
    setLoading(true);
    // console.log('parentId',parentId);
    reqCategorys(parentId).then(res => {
      setCategorys(res.data);
      setLoading(false);
      //   console.log(res.data);
    });
  }, [parentId]); // parentId update will cause fetch data

  return (
    <Card title={title} extra={extra}>
      {/* is dataSource[i].key not provide，use rowKey to asign the key */}
      <Table
        loading={loading}
        pagination={{ defaultPageSize: 3, showQuickJumper: true }}
        rowKey="_id"
        bordered
        columns={columns}
        dataSource={categorys}
      />
    </Card>
  );
};

export default Category;
