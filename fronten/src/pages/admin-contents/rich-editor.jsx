import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichEditor extends Component {
  state = {
    editorState: EditorState.createEmpty() //empty
  };

  constructor(props) {
    super(props);
    // get intial content of product detail
    const html = this.props.detail;
    if (html) {
      // 如果有值, 根据html格式字符串创建一个对应的编辑对象
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty()
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  /*
  function to Get content in rich editor (for parent component)
   */
  getDetaiContent = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };

  render() {
    const { editorState } = this.state;

    /**
     * upload local image
     */
    const uploadImageCallBack = file => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/manage/img/upload");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url;
          resolve({ data: { link: url}});
        });
        xhr.addEventListener("error", () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      });
    };
    return (
      <Editor
        editorState={editorState}
        editorStyle={{
          border: "1px solid #c4c4c4",
          minHeight: 200,
          paddingLeft: 10
        }}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
            previewImage: true,
          }
        }}
      />
    );
  }
}
