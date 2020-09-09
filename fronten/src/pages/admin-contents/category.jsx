import React from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Category = () => {
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

  const data = [
    {
      parentId: "0",
      _id: "5c2ed631f352726338607046",
      name: "分类001",
      __v: 0
    },
    {
      parentId: "0",
      _id: "5c2ed647f352726338607047",
      name: "分类2",
      __v: 0
    },
    {
      parentId: "0",
      _id: "5c2ed64cf352726338607048",
      name: "1分类3",
      __v: 0
    }
  ];
  return (
    <Card title={title} extra={extra}>
    {/* is dataSource[i].key not provide，use rowKey to asign the key */}
      <Table rowKey="_id" bordered columns={columns} dataSource={data} />
    </Card>
  );
};

export default Category;
