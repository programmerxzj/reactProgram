import React, {Component} from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Cascader,
  Button,
  message
} from 'antd'
import LinkButton from "../../components/link-button/link-button";
import {reqCategorys} from '../../api'
import PicturesWall from './pictures-wall'

const {Item} = Form
const {TextArea} = Input

/*
Product的默认子路由组件
 */
class ProductAddUpdate extends Component {
  state = {
    options: [], //初始一级为空
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0]
    //显示loading
    targetOption.loading = true

    //更据id查找其子类
    const subCategorys = await this.getCategorys(targetOption.value)
    //隐藏loading
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) {
      //生成二级列表
      const cOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      //  关联到当前option上
      targetOption.children = cOptions
    } else {
      targetOption.isLeaf = true
    }

    this.setState({
      options: [...this.state.options],
    })

  }

  initOptions = async (categorys) => {
    //  根据categories生成options
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))

    //二级列表的更新
    const {isUpdate, product} = this
    const {pCategoryId} = product
    if (isUpdate && pCategoryId !== '0') {
      //  获取对应的二级列表
      const subCategorys = await this.getCategorys(pCategoryId)
      //生成二级下拉option
      const cOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))

      //  找到当前option对应的一级对象
      const targetOption = options.find(option => option.value === pCategoryId)

      //  一二级option关联上
      targetOption.children = cOptions
    }

    //  更新状态
    this.setState({
      options
    })
  }

  /**
   * 异步获取一级/二级分类列表
   */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      //如果是一级分类列表
      if (parentId === '0') {
        this.initOptions(categorys)
      } else {
        //  二级分类列表
        return categorys
      }
    }
  }

  /**
   * 验证价格的自定义器
   */
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback()  //验证通过
    } else {
      callback('价格必须大于0') //验证失败
    }
  }
  submit = () => {
    //  收集数据进行表单验证
    this.props.form.validateFields((err, values) => {
      if (!err) {
        alert('发送ajax请求')
        console.log(values);
      }
    })
  }

  componentDidMount() {
    this.getCategorys('0')
  }

  componentWillMount() {
    //  取出state
    const product = this.props.location.state
    //  保存判断是否更新
    this.isUpdate = !!product
    //保存商品  如果没有 就是{}
    this.product = product || {}
  }

  render() {
    const {isUpdate, product} = this
    const {categoryId, pCategoryId} = product

    const categoryIds = []

    //接受分联的数组ID
    if (isUpdate) {
      // 商品是一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        // 商品是二级分类的商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20, marginRight: 10}}></Icon>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    //定义Item宽度
    const formItemLayout = {
      labelCol: {span: 2},  //左侧宽度
      wrapperCol: {span: 8},  //右侧宽度
    }

    const {getFieldDecorator} = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  {required: true, message: '必须输入商品名称'}
                ]
              })(<Input placeholder='请输入商品名称'/>)
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  {required: true, message: '必须输入商品描述'}
                ]
              })(<TextArea placeholder='请输入商品描述' autoSize/>)
            }
          </Item>
          <Item label='商品价格'>
            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  {required: true, message: '必须输入商品价格'},
                  {validator: this.validatePrice}
                ]
              })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
            }
          </Item>
          <Item label='商品分类'>
            {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  {required: true, message: '必须输入商品分类'},
                ]
              })(<Cascader
                placeholder='请输入商品分类'
                options={this.state.options}
                loadData={this.loadData}

              />)
            }

          </Item>
          <Item label='商品图片'>
            <PicturesWall/>
          </Item>
          <Item label='商品详情'>
            <div>商品详情</div>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
