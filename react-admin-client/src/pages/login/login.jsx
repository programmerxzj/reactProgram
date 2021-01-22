import React, {Component} from 'react'
import {
  Form,
  Input,
  Icon,
  Button,
} from 'antd'

import logo from './images/logo.png'
import './login.less'
import {reqLogin} from "../../api";

const Item = Form.Item

/*
* 登陆界面
* */
class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('发送ajax请求',values);
        //请求登陆
        const {username, password} = values
        reqLogin(username, password).then(response => {
          console.log('成功了', response.data);
        })
          .catch(err => {
            console.log('失败了', err);
          })

      } else {
        console.log('校验失败');
      }
    })
    // // 得到form对象
    // const form = this.props.form
    // // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
    // console.log('handleSubmit()', values)
  }
  //自定义校验
  /*
  用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于 4 位
  3). 必须小于等于 12 位
  4). 必须是英文、数字或下划线组成
*/
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码...')
    } else if (value.length < 4) {
      callback('密码长度不能小于4...')
    } else if (value.length > 12) {
      callback('密码长度不能大于12...')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是数字、字母、下划线...')
    } else {
      callback()
    }
  }

  render() {
    const form = this.props.form
    const {getFieldDecorator} = form
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React 项目: 后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h3>用户登陆</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    {required: true, whitespace: true, message: '用户名必须输入'},
                    {min: 4, message: '用户名至少4位'},
                    {max: 12, message: '用户名最多12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},
                  ],
                  initialValue: 'admin', // 初始值
                })(
                  <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin
