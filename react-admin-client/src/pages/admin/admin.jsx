import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtil from '../../utils/memoryUtil'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {Footer, Sider, Content} = Layout

/*
* 登陆界面
* */
export default class Admin extends Component {
  render() {
    const user = memoryUtil.user

    //判断user中是否为空
    if (!user || !user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:20,backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#bbb'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
