import React, { useState, useEffect } from "react";
import { Card, Button, Table, Space, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategorys } from "../../api";
import LinkedButton from "../../components/linked-button";
import UpdateForm from './category-update-form'
import AddForm from './category-add-form'

const Category = () => {
  const [categorys, setCategorys] = useState([]); //category list
  const [loading, setLoading] = useState(false); //loading status
  const [parentId, setParentId] = useState("0"); //parent id will triger fetch data
  const [parentName, setParentName] = useState(""); //parent name display on table header
  const [showModal, setShowModal] = useState(0); //control visibility of modal 0 invisible 1 show add modal 2 show edit modal

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

  //   add category
  const handleAddCat = () => {
    console.log("handleAddCat");
    setShowModal(0);
  };
  //   update category
  const handleUpdateCat = () => {
    console.log("handleUpdateCat");
    setShowModal(0);
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
    <Button type="primary" onClick={() => setShowModal(1)}>
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
          <a onClick={() => setShowModal(2)}>Edit</a>
          {parentId == "0" ? (
            <a onClick={() => showSubCategory(record)}>Sub-Category</a>
          ) : null}
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
    <>
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
      {/* ADD Modal */}
      <Modal
        title="ADD CATEGORY"
        visible={showModal === 1}
        onOk={handleAddCat}
        onCancel={() => setShowModal(0)}
      >
        <AddForm />
      </Modal>
      {/* Edit Modal */}
      <Modal
        title="EDIT CATEGORY"
        visible={showModal === 2}
        onOk={handleUpdateCat}
        onCancel={() => setShowModal(0)}
      >
        <UpdateForm />
      </Modal>
    </>
  );
};

export default Category;
