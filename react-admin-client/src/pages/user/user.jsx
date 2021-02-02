import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal
} from 'antd'

import {PAGE_SIZE} from "../../utils/constants";
import {formateDate} from "../../utils/dataUtils";
import LinkButton from "../../components/link-button/link-button";
import {reqUsers} from "../../api";

export default class User extends Component {
  state = {
    users: [], //所有用户集合
    roles: [], //所有角色集合
    isShow: false, //是否显示添加/更新界面
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'//显示数据对应的名称
      },
      {
        title: '邮箱',
        dataIndex: 'email'//显示数据对应的名称
      },
      {
        title: '电话',
        dataIndex: 'phone'//显示数据对应的名称
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',//显示数据对应的名称
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',//显示数据对应的名称
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /**
   * 初始化获取角色
   */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    //  保存
    this.roleNames = roleNames
  }

  /**
   * 添加或更新界面
   */
  addOrUpdateUser = () => {

  }

  //获取用户角色
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users, roles
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const {users, isShow} = this.state

    const title = <Button type='primary'>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          rowKey='_id'
          bordered
          columns={this.columns}
          dataSource={users}
          pagination={{defaultPageSize: PAGE_SIZE}}
        />

        <Modal
          title="添加分类"
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => this.setState({isShow: false})}
        >
          <div>添加/更新界面</div>
        </Modal>
      </Card>
    )
  }
}
