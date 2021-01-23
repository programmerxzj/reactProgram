/*入口js*/

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtil from "./utils/memoryUtil";

//读取local中保存user，保存到内存中
const user = storageUtils.getUser()
memoryUtil.user = user

//渲染标签
ReactDOM.render(<App/>, document.getElementById('root'))
