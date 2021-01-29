import React, {Component} from 'react'
import {Upload, Icon, Modal} from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/*
* 用于图片上传的组件
* */
export default class PicturesWall extends Component {
  state = {
    previewVisible: false,  // 标识是否显示大图预览Modal
    previewImage: '',       // 大图的url
    fileList: [
      {
        uid: '-1',      // 每个file都有自己唯一的id
        name: 'image.png',    // 图片文件名
        status: 'done',   // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',  // 图片地址
      },
    ],
  };

  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({file, fileList}) => {
    console.log('handleChange()', file.status, file, fileList.length);
    //操作过程中更新fileList
    this.setState({fileList})
  };

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action='/manage/img/upload'/*上传图片的接口地址*/
          accept='image/*'  //只接受图片格式
          name='image'  //请求参数名
          listType="picture-card" /*卡片样式*/
          fileList={fileList}  /*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}
