import React, {Component} from 'react'
import {Table,Card,Button,Icon} from 'antd';
import LinkButton from "../../components/link-button/link-button";

export default class Product extends Component {
  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: () => (
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ];

    const data = [
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
    ]
    return (
      <Card title='一级分类列表' extra={<Button type='primary'>
        <Icon type='plus'/>
        添加
      </Button>}>
        <Table
          // titleFixed
          rowKey='_id'
          bordered
          columns={columns}
          dataSource={data}
          pagination={{defaultPageSize: 2, showQuickJumper: true}}
        />
      </Card>
    )
  }
}
