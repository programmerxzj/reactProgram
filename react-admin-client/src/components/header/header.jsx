import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import LinkButton from '../link-button/link-button'
import {formateDate} from '../../utils/dataUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import memoryUtil from '../../utils/memoryUtil'
import storageUtils from '../../utils/storageUtils'


import './header.less'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //当前时间字符串
    city: '', //城市
    weather: ''  //天气
  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

  getWeather = async () => {
    //获得城市天气
    const {city, weather} = await reqWeather('垫江')
    //  更新状态
    this.setState({city, weather})
  }

  getTitle = () => {
    //  得到路径
    const path = this.props.location.pathname

    let title

    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        //  在子item中查找
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)

        //  如果cItem有值才匹配
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        console.log('ok');
        //  删除user数据
        storageUtils.removeUser()
        memoryUtil.user = {}

        //  跳转到登陆界面
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount() {
    //  实时获取当前时间
    this.getTime()
    //  获取当前天气
    this.getWeather()
  }

  componentWillUnmount() {
    //  清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const {currentTime, city, weather} = this.state

    const username = memoryUtil.user.username

    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <span>{city}</span>
            <span style={{color: 'red', fontSize: 20}}>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
