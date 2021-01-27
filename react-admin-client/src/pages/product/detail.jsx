import React, {Component} from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'

const Item = List.Item
/*
Product的详细信息的子路由组件
 */
export default class ProductDetail extends Component {
  render() {
    const title = (
      <span>
        <Icon type='arrow-left'/>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称：</span>
            <span>联想ThinkPad 翼480</span>
          </Item>
          <Item>
            <span className='left'>商品描述：</span>
            <span>年度重量级新品，X390、T490全新登场 更加轻薄机身设计9</span>
          </Item>
          <Item>
            <span className='left'>商品价格：</span>
            <span>66000元</span>
          </Item>
          <Item>
            <span className='left'>商品分类：</span>
            <span>电脑-->笔记本</span>
          </Item>
          <Item>
            <span className='left'>商品图片：</span>
            <span>
              <img
                className='product-img'
                src="123.jpg"
                alt="图片加载失败"
              />
              <img
                className='product-img'
                src="123.jpg"
                alt="图片加载失败"
              />
            </span>
          </Item>
          <Item>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{__html:'<h1 style="color:red">商品详情页</h1>'}} ></span>
          </Item>
        </List>
      </Card>
    )
  }
}
