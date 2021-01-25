/*
* 封装ajax请求函数
* */

import jsonp from 'jsonp'
import {message} from 'antd'

import ajax from "./ajax";

const BASE = ''
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

//获取天气请求函数jsonp
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=07bbf34022e6b600b16cd862513eeece`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // console.log('jsonp()', err, data)
      // 如果成功了
      if (data.status === '1') {
        // 取出需要的数据
        const {city, weather} = data.lives[0]
        resolve({city, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('重庆')
