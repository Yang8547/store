import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkedButton from "../../components/linked-button";
import { reqCategorys } from "../../api/index";
import PicturesWall from "./picture-wall";
import RichEditor from "./rich-editor";
import {reqAddOrUpdateProduct} from "../../api/index"
// form layout
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 8
  }
};
const { TextArea } = Input;

const ProductAddOrUpdate = props => {
  const [options, setOptions] = useState([]); // category cascader options
  const props_product = props.location.state || {}; // product state pass from router
  const isUpdate = !!props_product._id; //get boolean value of product_id exist, if not then it is 'add'
  // because cascader need values be array, so here is to form the cascader array
  const categoryIds = [];
  if (isUpdate) {
    // if product is base category
    if (props_product.pCategoryId === "0") {
      categoryIds.push(props_product.categoryId);
    } else {
      // if product has subcategory category
      categoryIds.push(props_product.pCategoryId);
      categoryIds.push(props_product.categoryId);
    }
  }
  props_product.categoryIds = categoryIds;
  const [product, setProduct] = useState(props_product); // product state

  /**
   * ref for picture wall to access child function from parent
   */
  const pw = useRef(null);
  /**
   * ref for rich editor to access child function from parent
   */
  const richEditorConten = useRef();

  useEffect(() => {
    // if UPDATE and has sub cat get subcategory list for display in cascader
    if (isUpdate && props_product.pCategoryId !== "0") {
      getCategories(props_product.pCategoryId);
    } else {
      //   get base category list
      getCategories("0");
    }
  }, []);

  /*
   * fetch category list base
   */

  const getCategories = parentID => {
    if (parentID === "0") {
      reqCategorys(parentID).then(res => {
        if (res.status === 0) {
          //   format options array
          const fetch_options = res.data.map(cat => {
            // return option object
            return {
              value: cat._id,
              label: cat.name,
              isLeaf: false
            };
          });

          setOptions(fetch_options);
        }
      });
    } else {
      Promise.all([reqCategorys(0), reqCategorys(parentID)]).then(res => {
        const fetch_options = res[0].data.map(cat => {
          // return option object
          return {
            value: cat._id,
            label: cat.name,
            isLeaf: false
          };
        });
        const children_options = res[1].data.map(cat => {
          // return option object
          return {
            value: cat._id,
            label: cat.name,
            isLeaf: true
          };
        });
        // finde current option
        const targetOption = fetch_options.find(
          option => option.value === parentID
        );
        // link child options
        targetOption.children = children_options;
        setOptions(fetch_options);
      });
    }
  };

  /*
  load children options
   */
  const loadData = selectedOptions => {
    //   selected option object
    const targetOption = selectedOptions[0];
    // loading effect
    targetOption.loading = true;

    // load sub categories
    reqCategorys(targetOption.value).then(res => {
      targetOption.loading = false;

      //   format options array
      const children_options = res.data.map(cat => {
        // return option object
        return {
          value: cat._id,
          label: cat.name,
          isLeaf: true
        };
      });
      //   if no sub category
      if (children_options.length == 0) {
        targetOption.isLeaf = true;
      }
      //   add children category list to taget option
      targetOption.children = children_options;
      //   update state
      setOptions([...options]);
    });
  };
  /**
   * card title
   */
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

      <span>ADD PRODUCT</span>
    </span>
  );
  /**
   * form submit
   */
  const onFinish = values => {
    console.log("Received values of form: ", values);
    console.log(pw.current.getImgs()); //get filelists from child component picture wall
    console.log(richEditorConten.current.getDetaiContent());
    // 1. collect data, wrap to product obj
    const { name, desc, price, categoryIds } = values; //form input
    let pCategoryId, categoryId; //cascader cat ids
    if (categoryIds.length === 1) {
      pCategoryId = "0";
      categoryId = categoryIds[0];
    } else {
      pCategoryId = categoryIds[0];
      categoryId = categoryIds[1];
    }
    const imgs = pw.current.getImgs(); // image from picture wall
    const detail = richEditorConten.current.getDetaiContent(); //content from rich editor

    // wrap product obj
    const product_for_add_or_update = {
      name,
      desc,
      price,
      imgs,
      detail,
      pCategoryId,
      categoryId
    };

    // if it is UPDATE, add _id
    if (isUpdate) {
        product_for_add_or_update._id = product._id;
    }
    
    

    // 2. SEND request to add or update product
    reqAddOrUpdateProduct(product_for_add_or_update).then(res => {
    
      if (res.status === 0) {
        message.success(`${isUpdate ? "UPDATE" : "ADD"}success!`);
        props.history.goBack();
      } else {
        message.error(`${this.isUpdate ? "UPDATE" : "ADD"}fail!`);
      }
    });
  };

  return (
    <div>
      <Card title={title} className="product-add">
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            initialValue={product.name}
            rules={[
              {
                required: true,
                message: "Please enter product name"
              }
            ]}
          >
            <Input placeholder="please enter product name" />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="desc"
            initialValue={product.desc}
            rules={[
              {
                required: true,
                message: "Please enter product description"
              }
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="price"
            initialValue={product.price}
            rules={[
              {
                required: true,
                message: "Please enter product price"
              },
              {
                type: "number",
                message: "Price must be number"
              },
              {
                //   price must be positive
                validator: (_, value) =>
                  value * 1 > 0
                    ? Promise.resolve()
                    : Promise.reject("Price must larger than 0")
              }
            ]}
          >
            <Input prefix="$" />
          </Form.Item>

          {/* cascader */}
          <Form.Item
            label="Product Category"
            name="categoryIds"
            initialValue={product.categoryIds}
            rules={[
              {
                required: true,
                message: "Please select a category for product"
              }
            ]}
          >
            <Cascader options={options} loadData={loadData} />
          </Form.Item>

          {/* picture wall for upload pic */}
          <Form.Item label="Images" name="images">
            <PicturesWall ref={pw} images={product.imgs} />
          </Form.Item>
          {/* Rich editor */}
          <Form.Item
            label="Detail"
            name="detail"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichEditor ref={richEditorConten} detail={product.detail} />
          </Form.Item>
          {/* submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductAddOrUpdate;
