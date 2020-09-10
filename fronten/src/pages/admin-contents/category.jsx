import React, { useState, useEffect } from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqCategorys } from "../../api";

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);

  //   card header
  const title = "CATEGORY";
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
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Sub-Category</a>
        </Space>
      )
    }
  ];

  const data = categorys;

  useEffect(() => {
    setLoading(true);
    reqCategorys("0").then(res => {
      setCategorys(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Card title={title} extra={extra}>
      {/* is dataSource[i].key not provide，use rowKey to asign the key */}
      <Table loading={loading} pagination={{defaultPageSize:3,showQuickJumper:true}} rowKey="_id" bordered columns={columns} dataSource={data} />
    </Card>
  );
};

export default Category;
