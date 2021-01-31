import React, {Component} from 'react'
import {
  Card,
  Button,
  Table
} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles} from '../../api'

export default class Role extends Component {
  state = {
    roles: [],  //所有角色列表
    role: {},  //选中的role
  }

  /**
   * 初始化列
   */
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
    // console.log(this.state.roles[0].name, this.state.roles[0].create_time);
    // console.log(this.state.roles[0].auth_name, this.state.roles[0].auth_time);
  }

  onRow = (role) => {
    return {
      onClick: event => {
        // alert('点击行')
        console.log(role);
        this.setState({
          role
        })
      }
    }
  }

  /**
   * 获取前台列表roles
   */
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }


  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const {roles, role} = this.state

    const title = (
      <span>
        <Button type='primary' style={{marginRight: '10px'}}>创建角色</Button>
        <Button type='primary' disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
          onRow={this.onRow}
        />
      </Card>
    )
  }
}
