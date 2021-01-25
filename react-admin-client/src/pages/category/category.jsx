import React, {Component} from 'react'
import {
  Table,
  Card,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

import LinkButton from '../../components/link-button/link-button'
import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api'

export default class Category extends Component {

  state = {
    categorys: [],  //一级分类列表
    subCategorys: [],  //二级分类列表
    loading: false, //是否正在加载中
    parentId: '0', //当前需要显示的分类列表的父类ID
    parentName: '',  //当前显示分类列表的父类名称
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }

  //初始化所有列数
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name'//显示数据对应的名称
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
            {
              this.state.parentId === '0' ?
                <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
            }
          </span>
        )
      }
    ]
  }
  //异步获取分类列表
  getCategorys = async () => {
    //  请求前
    this.setState({loading: true})
    const {parentId} = this.state
    //  发送ajax请求
    const result = await reqCategorys(parentId)

    //  请求后
    this.setState({loading: false})

    if (result.status === 0) {
      const categorys = result.data
      // console.log(result.data);
      if (parentId === '0') {
        this.setState({categorys})
      } else {
        this.setState({subCategorys: categorys})
      }
    } else {
      message.error('获取列表失败。。')
    }
  }

  //显示指定对象二级列表
  showSubCategorys = (category) => {
    //更新状态
    this.setState({
      parentId: category._id,
      paranetName: category.name
    }, () => {
      this.getCategorys()
      console.log('parentId', this.state.parentId);
    })

    // console.log('parentId',this.state.parentId);
    //获取二级分类列表
    // this.getCategorys()
  }

  //显示一级列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //点击取消
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  //显示添加
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  //添加分类
  addCategory = () => {
    console.log('addCategory()');
  }

  //显示更新
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  //更新分类
  updateCategory = () => {
    console.log('updateCategory()');
  }

  //第一次记载前初始化
  componentWillMount() {
    this.initColumns()
  }

  //加载完成后获取数据
  componentDidMount() {
    this.getCategorys()
  }

  render() {

    //读取状态
    const {loading, categorys, subCategorys, parentId, parentName, showStatus} = this.state

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
    )

    /*const data = [
      {
        "parentId": "0",
        "_id": "600e41f4bef75e2f68ab3dfb",
        "name": "一级分类1",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "600e4260bef75e2f68ab3dfc",
        "name": "一级分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "600e42c6bef75e2f68ab3dfd",
        "name": "一级分类4",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "600e9385bef75e2f68ab3dfe",
        "name": "一级分类3",
        "__v": 0
      }
    ]*/
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          loading={loading}
          columns={this.columns}
          dataSource={parentId === '0' ? categorys : subCategorys}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
        />

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          {/*<AddForm*/}
          {/*categorys={categorys}*/}
          {/*parentId={parentId}*/}
          {/*setForm={(form) => {this.form = form}}*/}
          {/*/>*/}
          <p>添加界面</p>
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          {/*<UpdateForm*/}
          {/*categoryName={category.name}*/}
          {/*setForm={(form) => {this.form = form}}*/}
          {/*/>*/}
          <p>更新界面</p>
        </Modal>
      </Card>
    )
  }
}
