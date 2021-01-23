import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import './left-nav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;

export default class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}></Icon>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="logo"/>
          <h1>杂货管理</h1>
        </Link>
        <Menu
          mode='inline'
          theme='dark'
        >
          {
            this.getMenuNodes(menuList)
          }

        </Menu>
      </div>
    )
  }
}
