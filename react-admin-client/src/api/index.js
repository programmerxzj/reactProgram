/*
* 封装ajax请求函数
* */

import ajax from "./ajax";

const BASE = ''
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')


//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
