import React, {Component} from 'react'
import {
  Form,
  Input,
  Icon,
  Button,
} from 'antd'

import logo from './images/logo.png'
import './login.less'

const Item = Form.Item

/*
* 登陆界面
* */
class Login extends Component {
  handleSubmit=(event)=>{
    event.preventDefault()

    // 得到form对象
    const form = this.props.form
    // // 获取表单项的输入数据
    const values = form.getFieldsValue()
    console.log('handleSubmit()', values)
  }
  render() {
    const form = this.props.form
    const { getFieldDecorator } = form
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
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                  initialValue: 'admin', // 初始值
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
