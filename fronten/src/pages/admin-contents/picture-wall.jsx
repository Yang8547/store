import React from "react";
import { Upload, Modal,message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  /**
   * file obj
{
   uid: 'uid',      // file id
   name: 'xx.png'   // file name 
   status: 'done', // status：uploading done error removed
   response: '{"status": "success"}', // 服务端响应内容
   linkProps: '{"download": "image"}', 
}
     */
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    });
  };
  /**
 * reference: antd "upload" -> onchange
 * {
    file: { },
    fileList: [ ],
    event: {  },
    }
 */
  handleChange = ({ file, fileList }) => {
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === "done") {
      const result = file.response; // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if (result.status === 0) {
        message.success("upload success!");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("upload fail");
      }
    }

    //更新fileList状态
    this.setState({ fileList });
  };

  getImgs = ()=>{
      return this.state.fileList.map(img=>img.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" /*上传图片的接口地址*/
          accept="image/*" /*只接收图片格式*/
          name="image" /*请求参数名,要和api文档的要求参数名一致*/
          listType="picture-card" /*卡片样式*/
          fileList={fileList} /*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
