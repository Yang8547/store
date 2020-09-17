import React, { useState, useEffect } from "react";
import { Card, Button, Table, Space, Modal,message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategorys, reqUpdateCategory } from "../../api";
import LinkedButton from "../../components/linked-button";
import UpdateForm from "./category-update-form";
import AddForm from "./category-add-form";

const Category = () => {
  const [categorys, setCategorys] = useState([]); //category list
  const [loading, setLoading] = useState(false); //loading status
  const [parentId, setParentId] = useState("0"); //parent id will triger fetch data
  const [parentName, setParentName] = useState(""); //parent name display on table header
  const [showModal, setShowModal] = useState(0); //control visibility of modal 0 invisible 1 show add modal 2 show edit modal
  const [formUpdate, setFormUpdate] = useState(); // update form
  const [reload, setReload] = useState(0);
  const [currentCategory, setCurrentCategory] = useState();


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
  //   show update modal
  const showUpdate = category => {
    setShowModal(2);
    setCurrentCategory(category);
  };
  //   update category
  const handleUpdateCat = () => {
    const categoryName = formUpdate.getFieldsValue().new_cat_name;
    const categoryId = currentCategory._id;
    reqUpdateCategory({ categoryId, categoryName }).then(res => {
      if(res.status==0){
        message.success('Update Success!');
      }
      setReload(!reload); // refresh page
    //   formUpdate.resetFields() //reset filds, otherwise will cause field value remain the last update value
    });
    // console.log("formUpdate",formUpdate);
    // console.log(formUpdate.getFieldsValue());

    setShowModal(0); // close update modal
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
          <a onClick={() => showUpdate(record)}>Edit</a>
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
  }, [parentId,reload]); // parentId update will cause fetch data, reload value change will also trigger reload

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
        <UpdateForm
          currentCategory={currentCategory}
          setFormUpdate={setFormUpdate}
        />
      </Modal>
    </>
  );
};

export default Category;
